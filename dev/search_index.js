var documenterSearchIndex = {"docs":
[{"location":"Installation/#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"Installation/","page":"Installation","title":"Installation","text":"If you haven't already, install Julia.","category":"page"},{"location":"Installation/","page":"Installation","title":"Installation","text":"Open the Julia REPL and access the package manager by typing ]. Add PlotDFT.jl.","category":"page"},{"location":"Installation/","page":"Installation","title":"Installation","text":"(@v1.8) pkg> add https://github.com/xamberl/PlotDFT.git","category":"page"},{"location":"DOS_ref/#Density-of-States-(DOS)","page":"Docstrings","title":"Density of States (DOS)","text":"","category":"section"},{"location":"DOS_ref/","page":"Docstrings","title":"Docstrings","text":"Functions relevant to the plotting DOS distributions.","category":"page"},{"location":"DOS_ref/","page":"Docstrings","title":"Docstrings","text":"import_DOS_VASP\nimport_DOS_lobster\nPlotDFT.DOSinfo\nplot_DOS\nplot_pDOS\ndos_layout\nnum_electrons_at_energy\nenergy_at_electron_ct","category":"page"},{"location":"DOS_ref/#PlotDFT.import_DOS_VASP","page":"Docstrings","title":"PlotDFT.import_DOS_VASP","text":"import_DOS_VASP(directory::AbstractString==\"\") -> DOSinfo\n\nImports information for plotting DOS from the VASP files DOSCAR, POSCAR, and OUTCAR and returns it as a DOSinfo object.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.import_DOS_lobster","page":"Docstrings","title":"PlotDFT.import_DOS_lobster","text":"import_DOS_lobster(directory::AbstractString==\"\") -> DOSinfo\n\nImports information for plotting DOS from DOSCAR.lobster and POSCAR\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.DOSinfo","page":"Docstrings","title":"PlotDFT.DOSinfo","text":"DOSinfo(\n    tdos::DensityOfStates,\n    pdos::Vector{ProjectedDensityOfStates},\n    fermi::Real,\n    alphabeta::Real,\n    pos::PeriodicAtomList{3},\n    )\n\nOrganizes information relevant to the plotting of the electronic density of states.     See Electrum.jl's documentation for information about DensityOfStates,     ProjectedDensityOfStates, and PeriodicAtomList.\n\n\n\n\n\n","category":"type"},{"location":"DOS_ref/#PlotDFT.plot_DOS","page":"Docstrings","title":"PlotDFT.plot_DOS","text":"plot_DOS(\n    dosinfo::DOSinfo;\n    emin::Real=0,\n    emax::Real=0,\n    xmax::Real=0,\n    eaxis::String=\"relative\"\n)\n-> PlotlyJS.SyncPlot\n\nReturns a plot of the total density of states.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.plot_pDOS","page":"Docstrings","title":"PlotDFT.plot_pDOS","text":"plot_pDOS(\n    plot::PlotlyJS.SyncPlot,\n    dosinfo::DOSinfo;\n    atom::Int,\n    pdos::String,\n    color::String=\"black\")\n-> PlotlyJS.SyncPlot\n\nAdds a filled projected density of states to a given plot.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.dos_layout","page":"Docstrings","title":"PlotDFT.dos_layout","text":"dos_layout(emin::Real, emax::Real, xmax::Real)\n\nReturns a PlotlyJS layout object with default settings and ranges specified by emin/emax/xmax.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.num_electrons_at_energy","page":"Docstrings","title":"PlotDFT.num_electrons_at_energy","text":"num_electrons_at_energy(tdos::DensityOfStates, energy::Real) -> Float64\n\nReturns the electron count of the unit cell at a specified energy using the total DOS.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.energy_at_electron_ct","page":"Docstrings","title":"PlotDFT.energy_at_electron_ct","text":"energy_at_electron_ct(dosinfo::DOSinfo, electron_ct::Real) -> Float64\n\nReturns the energy of corresponding electron count using the total DOS.\n\n\n\n\n\nenergy_at_electron_ct(\n    dosinfo::DOSinfo,\n    electron_ct::Real,\n    plot::PlotlyJS.SyncPlot;\n    color::String=\"red\"\n)\n-> PlotlyJS.SyncPlot\n\nAdds a horizontal dotted line to a plot corresponding to the energy at a specified electron count.\n\n\n\n\n\n","category":"function"},{"location":"#PlotDFT.jl","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Scripts for plotting basic DFT data from VASP with Julia. Plots can be exported in any of the formats allowed by PlotlyJS for post-processing, including .pdf, .html, .json, .png, .svg, .jpeg, and .webp.","category":"page"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"(Image: Sc 3d Projected Density of States of AuCu3-type ScAl3)","category":"page"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"See examples for more detail.","category":"page"},{"location":"#Dependencies","page":"PlotDFT.jl","title":"Dependencies","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Electrum for reading DFT data\nPlotlyJS for plotting","category":"page"},{"location":"#Current-features","page":"PlotDFT.jl","title":"Current features","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Plot total DOS\nPlot projected DOS (l- and lm- decomposed)","category":"page"},{"location":"#Planned-features","page":"PlotDFT.jl","title":"Planned features","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Customize legend\nPlot spin-polarized DOS.\nPlot band structures.\nPlot -pCOHP curves from LOBSTER.\nPlot phonon DOS and band structures.","category":"page"},{"location":"DOS_guide/#Prepare-files-and-use-PlotDFT","page":"Guide to plotting the density of states","title":"Prepare files and use PlotDFT","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"We'll walk through the PDOS_ScAl3 example.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"To plot DOS data, we need to read information from three VASP files:","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"OUTCAR - the Fermi energy\nPOSCAR - crystallographic geometry\nDOSCAR - the DOS distributions","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Copy these files from the examples into a working directory. Open the Julia REPL in your working directory and load PlotDFT.jl","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"using PlotDFT","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"note: Note\nIt is recommended to write these commands in a .jl file, so that commands to generate your plot are saved and can be rerun. See the example PDOS_ScAl3.jl.","category":"page"},{"location":"DOS_guide/#Importing-data-from-files","page":"Guide to plotting the density of states","title":"Importing data from files","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Now we must extract the relevant data from our VASP files. To do this, we use import_DOS_VASP.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"dos = import_DOS_VASP()","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"By default, it will check the current directory for the three files. If your files are in another directory, you can specify the directory as an argument.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"dos = import_DOS_VASP(\"/path/to/files\")","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"The relevant information is stored into our dos variable, which is a PlotDFT.DOSinfo struct. You can see information about our system.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"PlotDFT.DOSinfo: Al₃Sc\n Atom type 1: Sc\n Atom type 2: Al\n Projected DOS is l-decomposed: (1) s, (2) p, (3) d\n Fermi energy: 7.2264, α+β: -14.522","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Here, we see the chemical formula of the system, the order of the atoms as listed in the POSCAR, information about the projected DOS (if included), and the Fermi energy.","category":"page"},{"location":"DOS_guide/#Plotting-the-total-density-of-states","page":"Guide to plotting the density of states","title":"Plotting the total density of states","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"We now can use plot_DOS to generate a total DOS distribution and store the plot object in the variable p1.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"p1 = plot_DOS(dos)","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"(Image: Total DOS distribution of ScAl3)","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"By default, the energies will be plotted relative to the Fermi energy (E-E<sub>F</sub>), ranging from the minimum DOS energy to 1 eV + the Fermi energy. The x-axis will range from 0 to 1.1 * the maximum states per eV. These can be modified with arguments to the function.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"p1_abs = plot_DOS(dos, emin = -17, emax = -7, xmax = 4, eaxis = \"absolute\")","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"(Image: Total DOS distribution of ScAl3, in absolute energy units)","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Now, I've specified our energy axis to be plotted in absolute units (as opposed to relative units), as well as modified the range of the energy and states axes.","category":"page"},{"location":"DOS_guide/#Plotting-the-projected-density-of-states","page":"Guide to plotting the density of states","title":"Plotting the projected density of states","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Let's plot the projected density of states corresponding to the Sc 3d bands. Again, we can look at dos to see what type of information is available.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"PlotDFT.DOSinfo: Al₃Sc\n Atom type 1: Sc\n Atom type 2: Al\n Projected DOS is l-decomposed: (1) s, (2) p, (3) d\n Fermi energy: 7.2264, α+β: -14.522","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"The relevant information corresponds to Sc, atom type 1. Our DOSCAR holds l-decomposed projected DOS information, and the d-bands correspond to the number 3. We can now use plot_pDOS with our total density of states plot.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"p1 = PlotDFT.plot_pDOS(p1, dos, atom=1, pdos=3, color=\"#FF0000\")","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Here, the required arguments are p1 and dos, corresponding to our total density of states plot and information about our system, respectively. Additionally, we need to specify what atom we use with atom=1 and which pdos to plot with pdos=3. The only optional argument here is the color. The default color is black; here, it is a string corresponding to the hexadecimal for red.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"(Image: Projected DOS distribution of Sc 3d bands in ScAl3)","category":"page"},{"location":"DOS_guide/#Adjusting-plot-formatting","page":"Guide to plotting the density of states","title":"Adjusting plot formatting","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"We can adjust plot formatting by reaching into the PlotlyJS package's relayout! function. Below is an example of formatting you might consider.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"PlotDFT.relayout!(\n    p2,\n    title_text = \"DOS distribution of AuCu<sub>3</sub>-type ScAl<sub>3</sub>\",\n    title_x = 0.5,\n    xaxis_title_text = \"states per eV\",\n    yaxis_title_text = \"Energy (eV)\",\n    showlegend = false\n)","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"The first argument must be the plot object (in this case, p2), while the rest are optional. In this example, a title is added and centered, as well as titles for the axes. In addition, the legend is turned off. See https://plotly.com/julia/reference/layout/ for a list of options!","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"(Image: Sc 3d Projected Density of States of AuCu3-type ScAl3)","category":"page"},{"location":"DOS_guide/#Saving-the-figure","page":"Guide to plotting the density of states","title":"Saving the figure","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"PlotlyJS can save figures in the following file formats:","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":".pdf\n.html\n.json\n.png\n.svg\n.jpeg\n.webp","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"PlotDFT.savefig(p2, width=400, height=800, \"ScAl3_Sc_d_pdos.svg\")","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"Oftentimes, PlotlyJS will not save your figure in the displayed dimensions, so it's recommended to specify the dimensions (in pixels) in the arguments. You can also optionally specify a scale (see documentation). The last argument is a string corresponding to the path, filename, and file format of the plot.","category":"page"},{"location":"DOS_guide/","page":"Guide to plotting the density of states","title":"Guide to plotting the density of states","text":"note: Note\nFor the purpose of post-processing (with graphics-editing programs like Photoshop, Illustrator, or Affinity), it is recommended to export these figures as vector-based formats, such as SVG or PDF. Beware that some programs cannot open or import SVG files, so PDF is generally more accessible.","category":"page"}]
}
