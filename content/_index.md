+++
title = "24h Vulga – La, le, les physique·s"

[extra]
# Si le logo doit être affiché centré verticalement, ou en haut.
# Pertinent centré sur les pages d'index, ou s'il y a peu de texte. Sinon, non.
center_logo = true

# Liens affichés sous le texte d'introduction (qu'est le corps de ce fichier MD).
# Contenu de chaque élément :
#   title = texte affiché du lien (Markdown inline supporté)
# Et l'un des deux :
#   path = chemin interne du lien (vers un fichier statique ou .md)
#   url = chemin externe du lien
links = [
    { title = "Discord", url = "https://discord.gg/QcDZxbYPpj" },
    { title = "Presse", path = "pogscience-24h-vulga-presse.pdf" }
]

# Logos affichés à côté des liens ci-dessus, ou dessous sur mobile. Chaque logo est aussi un
# lien vers le site du partenaire.
# Contenu de chaque élément :
#   title = texte affiché au survol du logo
#   alt = texte alternatif du logo
#   logo = chemin vers le fichier image du logo (idéalement SVG)
# Et l'un des deux :
#   path = chemin interne du lien (vers un fichier statique ou .md)
#   url = chemin externe du lien
logos = [
    { url = "https://cnrs.fr", logo="logos/cnrs.svg", alt="En partenariat avec le Centre national de la recherche scientifique (CNRS)", title="En partenariat avec le Centre national de la recherche scientifique (CNRS)"}
]

[extra.events]
# Section contenant les événements
section = "streams/_index.md"
# Chemin vers le fichier représentant l'export iCal (avec le template `ical.html`).
calendar = "@/_streams.ics.md"
+++

{{ main_title(above="PogScience présente <strong>24h Vulga</strong>", title="La, le, les physique·s") }}

Les 24h Vulga, c’est **12 lives Twitch de 2h chacun** depuis la France, la Suisse et le Québec, pour un flot
ininterrompu de connaissances **sous de nombreux angles différents** !

Des labos du Centre National de Recherche Scientifique (CNRS) aux volcans du monde, de l’aviation à l’art, en
passant par la science-fiction, la biologie, l’histoire et bien d’autres, **rejoins-nous** ✨
