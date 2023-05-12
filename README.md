# PlotDFT
Scripts for plotting basic DFT data from VASP with Julia.
Plots can be exported in any of the formats allowed by PlotlyJS for post-processing, including .pdf, .html, .json, .png, .svg, .jpeg, and .webp.

See examples for more detail.

# Dependencies
* Electrum (https://github.com/brainandforce/Electrum.jl) for reading DFT data
* PlotlyJS for plotting

# Current features
* Plot total DOS
* Plot projected DOS (l- and lm- decomposed)

# Planned features
* Plot spin-polarized DOS.
* Plot band structures.
* Plot -pCOHP curves from LOBSTER.
* Plot phonon DOS and band structures.