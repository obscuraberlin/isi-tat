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

## AVIF und WebP daneben

Liegt neben `07.jpg` auch `07.avif` und `07.webp`, liefert die Seite jedem
Browser das beste Format, das er anzeigen kann — und das JPG bleibt als
Rückfallebene für alte Browser stehen. Das AVIF ist bei gleicher Qualität
rund halb so groß; dadurch können die Bilder in voller Auflösung liegen
und wiegen trotzdem weniger als eine kleingerechnete JPG-Fassung.

```
07.jpg     Rückfallebene, wird immer gebraucht
07.avif    erste Wahl
07.webp    zweite Wahl
```

Du musst das nicht selbst erzeugen. Lege einfach die beste Fassung ab, die
du hast — sag Bescheid, dann rechne ich die anderen beiden daraus.

Bei **Posterbildern** hat das keinen Sinn: das Poster hängt als Attribut am
Video, dort handelt kein Browser ein Format aus. Ein `03-poster.avif` wird
deshalb ignoriert.

## Eine Datei für alle Geräte

Eine getrennte Handy-Fassung gibt es nicht. Der Browser wertet bei Videos
keine Bildschirmbreite aus — eine zweite Datei würde nur so aussehen, als
brächte sie etwas. Komprimiere stattdessen einmal gut: 1080p reicht auch
auf großen Bildschirmen.

## Größe

**Bilder** mindestens 2000 px auf der langen Seite — lieber größer als
kleiner. Auf einem Retina-Bildschirm braucht eine Fläche über die volle
Breite rund 2900 px; was darunter liegt, sieht dort weich aus, und
hochrechnen bringt die Schärfe nicht zurück. Die Datei darf ruhig schwer
sein: ausgeliefert wird ohnehin die gerechnete AVIF-Fassung.

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
