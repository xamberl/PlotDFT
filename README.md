# PlotDFT
Scripts for plotting basic DFT data from VASP with Julia.
Plots can be exported in any of the formats allowed by PlotlyJS for post-processing, including .pdf, .html, .json, .png, .svg, .jpeg, and .webp.

![Sc 3d Projected Density of States of AuCu3-type ScAl3](/examples/PDOS_ScAl3/ScAl3_Sc_d_pdos.svg)

See examples for more detail.

# Dependencies
* Electrum (https://github.com/brainandforce/Electrum.jl) for reading DFT data
* PlotlyJS for plotting

# Current features
* Plot total DOS
* Plot projected DOS (l- and lm- decomposed)

# Planned features
* Customize legend
* Plot spin-polarized DOS.
* Plot band structures.
* Plot -pCOHP curves from LOBSTER.
* Plot phonon DOS and band structures.