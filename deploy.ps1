# Script de deployment a GitHub Pages
# Evita el problema de rutas largas

$branch = "gh-pages"
$dir = "dist"

# Crear archivo .nojekyll en dist
Write-Host "Creando .nojekyll..."
New-Item -Path "$dir\.nojekyll" -ItemType File -Force | Out-Null

# Stash changes si es necesario
$stashNeeded = git status --porcelain
if ($stashNeeded) {
    Write-Host "Guardando cambios..."
    git stash
}

# Cambiar a rama gh-pages o crearla
Write-Host "Checkout a rama $branch..."
$ghPagesBranchExists = git rev-parse --verify $branch 2>$null
if ($LASTEXITCODE -ne 0) {
    git checkout --orphan $branch
    git reset --hard
} else {
    git checkout $branch
}

# Copiar archivos de dist a la raíz
Write-Host "Copiando archivos de $dir..."
Get-ChildItem -Path $dir | ForEach-Object {
    Copy-Item -Path "$dir\$($_.Name)" -Destination ".\" -Recurse -Force
}

# Commit y push
Write-Host "Commitiendo cambios..."
git add .
$commitMsg = "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMsg

Write-Host "Pusheando a $branch..."
git push -u origin $branch --force

# Volver a main
Write-Host "Volviendo a main..."
git checkout main

# Restaurar cambios si fue necesario
if ($stashNeeded) {
    Write-Host "Restaurando cambios..."
    git stash pop
}

Write-Host "¡Deployment completado!"
Write-Host "La app está disponible en: https://andresoviedo927.github.io/SOFED-_-App-Tur-stica-Villa-de-Leyva-Boyac-/"
