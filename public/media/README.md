# Material hier ablegen

Jede Platzhalterfläche auf der Seite trägt eine **Nummer**. Lege die Datei
hier ab und benenne sie nach dieser Nummer — mehr ist nicht nötig. Der
Build sucht sie beim nächsten Deploy selbst und tauscht den Platzhalter
gegen die Datei.

```
03.mp4    →  90-Sekunden-Trailer
06.mp4    →  ISI TAT über seinen Weg
07.jpg    →  Serie „Mindset & Persönlichkeit", Hochformat
```

Welche Nummer wofür steht, steht in **MEDIEN.md** im Hauptverzeichnis.

## Erlaubte Endungen

| Art | Endungen |
|---|---|
| Bild | `.jpg` `.jpeg` `.png` `.webp` `.avif` |
| Video | `.mp4` `.webm` |

Die Nummer muss zweistellig sein: `03.mp4`, nicht `3.mp4`. Groß- und
Kleinschreibung der Endung ist egal.

## Posterbild für ein Video

Ein Standbild, das vor dem Abspielen zu sehen ist. Gleiche Nummer plus
`-poster`:

```
03.mp4
03-poster.jpg
```

Ohne Posterbild zeigt der Browser das erste Videobild — meist ein
zufälliger Frame.

## Eine Datei für alle Geräte

Eine getrennte Handy-Fassung gibt es nicht. Der Browser wertet bei Videos
keine Bildschirmbreite aus — eine zweite Datei würde nur so aussehen, als
brächte sie etwas. Komprimiere stattdessen einmal gut: 1080p reicht auch
auf großen Bildschirmen.

## Größe

**Bilder** mindestens 2000 px auf der langen Seite, als JPG unter 1 MB.

**Videos** sind der heikle Teil. GitHub lehnt Dateien über **100 MB** ab und
warnt ab 50 MB. Alles, was hier landet, bleibt für immer in der
Repository-Historie und wird bei jedem Klonen mitgeladen — auch wenn du es
später löschst.

- **Unter 25 MB** → hier ablegen, unproblematisch.
- **Darüber** → erst kleiner rechnen. 1080p, H.264, ungefähr 4 Mbit/s
  reichen für eine Webseite völlig. Ein 90-Sekunden-Clip landet damit bei
  rund 45 MB, mit 2,5 Mbit/s bei rund 28 MB.
- **Bleibt es groß** → nicht hierher. Dann besser bei einem Videohoster
  (Vimeo, Cloudflare Stream, Bunny) ablegen und die Adresse eintragen
  lassen. Sag Bescheid, dann baue ich das ein.

## Was passiert, wenn eine Datei fehlt

Nichts bricht. Die Fläche zeigt weiter den nummerierten Platzhalter.
