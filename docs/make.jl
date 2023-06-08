using Documenter, PlotDFT

makedocs(
    sitename="PlotDFT.jl",
    modules = Module[PlotDFT],
    pages = [
        "index.md",
        "Density of states (DOS)" => [
            "Guide: DOS with VASP (ScAl₃)" => "DOS_guide.md",
            "Guide: DOS with LOBSTER (IrIn₃)" => "DOS_lobster_guide.md",
            "Docstrings" => "DOS_ref.md",
        ]
    ]
    )

deploydocs(
    repo = "github.com/xamberl/PlotDFT.git",
    versions = nothing
)