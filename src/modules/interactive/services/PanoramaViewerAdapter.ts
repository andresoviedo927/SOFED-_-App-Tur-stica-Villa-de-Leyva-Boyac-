import type { PlazaPrincipalPanorama } from '../types/panorama.types';

export interface PanoramaViewerAdapter {
  load(panorama: PlazaPrincipalPanorama): Promise<void>;
  reset(): void;
  zoomIn(): void;
  zoomOut(): void;
  panBy(deltaX: number, deltaY: number): void;
  zoomBy(delta: number): void;
  setInteracting(interacting: boolean): void;
  destroy(): void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const BASE_FIELD_OF_VIEW = 1.18;
const MAX_PITCH = 1.18;

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;
  uniform sampler2D u_panorama;
  uniform float u_aspect;
  uniform float u_fieldOfView;
  uniform float u_yaw;
  uniform float u_pitch;

  const float PI = 3.141592653589793;

  void main() {
    vec2 screen = v_uv * 2.0 - 1.0;
    float spread = tan(u_fieldOfView * 0.5);
    vec3 direction = normalize(
      vec3(screen.x * u_aspect * spread, screen.y * spread, -1.0)
    );

    float pitchCos = cos(u_pitch);
    float pitchSin = sin(u_pitch);
    direction = vec3(
      direction.x,
      direction.y * pitchCos - direction.z * pitchSin,
      direction.y * pitchSin + direction.z * pitchCos
    );

    float yawCos = cos(u_yaw);
    float yawSin = sin(u_yaw);
    direction = vec3(
      direction.x * yawCos - direction.z * yawSin,
      direction.y,
      direction.x * yawSin + direction.z * yawCos
    );

    float longitude = atan(direction.x, -direction.z);
    float latitude = asin(clamp(direction.y, -1.0, 1.0));
    vec2 panoramaUv = vec2(
      fract(longitude / (2.0 * PI) + 0.5),
      0.5 - latitude / PI
    );

    gl_FragColor = texture2D(u_panorama, panoramaUv);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('No se pudo crear el shader panorámico.');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message ?? 'No se pudo compilar el panorama.');
  }

  return shader;
};

export class LocalPanoramaViewerAdapter
  implements PanoramaViewerAdapter
{
  private panorama: PlazaPrincipalPanorama | null = null;
  private readonly gl: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly texture: WebGLTexture;
  private zoom = 1;
  private yaw = 0;
  private pitch = 0;
  private resizeObserver: ResizeObserver | null = null;
  private destroyed = false;
  private textureReady = false;

  constructor(
    private readonly viewport: HTMLDivElement,
    private readonly canvas: HTMLCanvasElement
  ) {
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });
    if (!gl) {
      throw new Error('El navegador no admite la vista panorámica 360.');
    }
    this.gl = gl;

    const vertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      VERTEX_SHADER
    );
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER
    );
    const program = gl.createProgram();
    if (!program) {
      throw new Error('No se pudo iniciar el visor panorámico.');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(message ?? 'No se pudo enlazar el panorama.');
    }
    this.program = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    if (!texture) {
      throw new Error('No se pudo crear la textura panorámica.');
    }
    this.texture = texture;

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.render());
      this.resizeObserver.observe(viewport);
    }
  }

  async load(panorama: PlazaPrincipalPanorama): Promise<void> {
    const image = new Image();
    image.decoding = 'async';

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(
          new Error(`No se pudo cargar el panorama: ${panorama.src}`)
        );
      image.src = panorama.src;
    });

    if (this.destroyed) return;

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 2048;
    textureCanvas.height = 1024;
    const context = textureCanvas.getContext('2d');
    if (!context) {
      throw new Error('No se pudo preparar la imagen panorámica.');
    }
    context.drawImage(image, 0, 0, 2048, 1024);

    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      textureCanvas
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_T,
      gl.CLAMP_TO_EDGE
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);

    this.panorama = panorama;
    this.textureReady = true;
    this.reset();
  }

  reset(): void {
    const panorama = this.panorama;
    this.zoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, panorama?.initialZoom ?? 1)
    );
    this.yaw = panorama?.initialYaw ?? 0;
    this.pitch = panorama?.initialPitch ?? 0;
    this.render();
  }

  zoomIn(): void {
    this.setZoom(this.zoom + 0.2);
  }

  zoomOut(): void {
    this.setZoom(this.zoom - 0.2);
  }

  zoomBy(delta: number): void {
    this.setZoom(this.zoom + delta);
  }

  panBy(deltaX: number, deltaY: number): void {
    this.yaw -= deltaX * 0.004;
    this.pitch = Math.min(
      MAX_PITCH,
      Math.max(-MAX_PITCH, this.pitch + deltaY * 0.003)
    );
    this.render();
  }

  setInteracting(_interacting: boolean): void {}

  destroy(): void {
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.gl.deleteTexture(this.texture);
    this.gl.deleteProgram(this.program);
  }

  private setZoom(nextZoom: number): void {
    this.zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
    this.render();
  }

  private render(): void {
    if (!this.textureReady || this.destroyed) return;

    const gl = this.gl;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(
      1,
      Math.round(this.viewport.clientWidth * pixelRatio)
    );
    const height = Math.max(
      1,
      Math.round(this.viewport.clientHeight * pixelRatio)
    );

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }

    gl.viewport(0, 0, width, height);
    gl.useProgram(this.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(
      gl.getUniformLocation(this.program, 'u_panorama'),
      0
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, 'u_aspect'),
      width / height
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, 'u_fieldOfView'),
      BASE_FIELD_OF_VIEW / this.zoom
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, 'u_yaw'),
      this.yaw
    );
    gl.uniform1f(
      gl.getUniformLocation(this.program, 'u_pitch'),
      this.pitch
    );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export const createPanoramaViewerAdapter = (
  viewport: HTMLDivElement,
  canvas: HTMLCanvasElement
): PanoramaViewerAdapter =>
  new LocalPanoramaViewerAdapter(viewport, canvas);
