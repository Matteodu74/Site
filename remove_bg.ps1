Add-Type -AssemblyName System.Drawing
$file = "c:\Site\logo region.png"
$img = New-Object System.Drawing.Bitmap($file)
$width = $img.Width
$height = $img.Height

for ($x = 0; $x -lt $width; $x++) {
    for ($y = 0; $y -lt $height; $y++) {
        $c = $img.GetPixel($x, $y)
        # Check if it's white or light grey (like checkerboard)
        # Checkerboards are usually #FFFFFF and #CCCCCC or similar
        if ($c.R -gt 230 -and $c.G -gt 230 -and $c.B -gt 230) {
            $img.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        } elseif ($c.R -gt 200 -and $c.G -gt 200 -and $c.B -gt 200 -and [Math]::Abs($c.R - $c.G) -lt 10 -and [Math]::Abs($c.G - $c.B) -lt 10) {
            # Light grey (checkerboard grey)
            $img.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}
$img.Save("c:\Site\logo region_transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Host "Done"
