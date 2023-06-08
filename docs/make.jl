using Documenter, PlotDFT

makedocs(
    sitename="PlotDFT.jl",
    modules = Module[PlotDFT],
    pages = [
        "index.md",
        "Installation.md",
        "Density of states (DOS)" => [
            "Guide to plotting the density of states" => "DOS_guide.md",
            "Docstrings" => "DOS_ref.md",
        ]
    ]
    )

deploydocs(
    repo = "github.com/xamberl/PlotDFT.git",
)