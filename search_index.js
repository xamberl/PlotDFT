var documenterSearchIndex = {"docs":
[{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"This version of the guide walks through the DOS_lobster_IrIn3 example. This allows us to use the DOSCAR generated by LOBSTER.","category":"page"},{"location":"DOS_lobster_guide/#Prepare-files-and-use-PlotDFT","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Prepare files and use PlotDFT","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"We'll walk through the DOS_lobster_IrIn3 example.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"In this case, we need information from only two files:","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"DOSCAR.lobster - the DOS distributions\nPOSCAR - crystallographic geometry","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Copy these files from the examples into a working directory. Open the Julia REPL in your working directory and load PlotDFT.jl","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"using PlotDFT","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"note: Note\nIt is recommended to write these commands in a .jl file, so that commands to generate your plot are saved and can be rerun. See the example DOS_lobster_IrIn3.jl.","category":"page"},{"location":"DOS_lobster_guide/#Importing-data-from-files","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Importing data from files","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Now we must extract the relevant data from our VASP files. To do this, we use import_DOS_lobster.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"dos = import_DOS_lobster()","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"The relevant information is stored into our dos variable, which is a PlotDFT.DOSinfo struct. You can see information about our system.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"DOSinfo: In₃Ir\n Atom type 1: In\n Projected DOS is l-decomposed: (1) s, (2) py, (3) pz, (4) px\n Atom type 2: Ir\n Projected DOS is lm-decomposed: (1) s, (2) dxy, (3) dyz, (4) dz2, (5) dxz, (6) dx2-y2\n Fermi energy: 0, α+β: 0","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Note that the Fermi energy and α+β values are not read in this import method.","category":"page"},{"location":"DOS_lobster_guide/#Plotting-the-total-density-of-states","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Plotting the total density of states","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"We now can use plot_DOS to generate a total DOS distribution and store the plot object in the variable p.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"p = plot_DOS(dos)","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"(Image: Total DOS distribution of IrIn3)","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"note: Note\nBy default, the energies will be plotted relative to the Fermi energy, ranging from the minimum DOS energy to 1 eV + the Fermi energy. The x-axis will range from 0 to 1.1 * the maximum states per eV. These can be modified with arguments to the plot_DOS function.","category":"page"},{"location":"DOS_lobster_guide/#Plotting-the-projected-density-of-states","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Plotting the projected density of states","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Let's plot the projected density of states corresponding to the Ir 5d bands. Again, we can look at dos to see what type of information is available.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"DOSinfo: In₃Ir\n Atom type 1: In\n Projected DOS is l-decomposed: (1) s, (2) py, (3) pz, (4) px\n Atom type 2: Ir\n Projected DOS is lm-decomposed: (1) s, (2) dxy, (3) dyz, (4) dz2, (5) dxz, (6) dx2-y2\n Fermi energy: 0, α+β: 0","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"The relevant information corresponds to Ir, atom type 2. Our DOSCAR holds lm-decomposed projected DOS information. We can now use plot_pDOS with our total density of states plot.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"p1 = plot_pDOS(p, dos, atom=2, pdos=\"d\")","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Here, the required arguments are p and dos, corresponding to our total density of states plot and information about our system, respectively. Additionally, we need to specify what atom we use with atom=1 and which pdos to plot with pdos=\"d\".","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"(Image: Projected DOS distribution of Ir d in IrIn3)","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"We can also project a specific d orbital. For example, let's select the Ir 5d<sub>z<sup>2</sup></sub> orbitals.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"p2 = plot_pDOS(p, dos, atom=2, pdos=\"dz2\")","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"(Image: Projected DOS distribution of Ir dz2 in IrIn3)","category":"page"},{"location":"DOS_lobster_guide/#Adjusting-the-energy-at-hypothetical-electron-counts","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Adjusting the energy at hypothetical electron counts","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"IrIn₃ is an 18-electron compound. We can see what energy corresponds to an 17-electron valence electron count.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"p3 = energy_at_electron_ct(dos, 68, p1, color=\"gray\")\np3.plot.data[end].name = \"17 e<sup>-</sup>/f.u.\"","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Here, 68 corresponds to 4 * 17 electrons for the number of formula units in the POSCAR. The second line changes the label of the line.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"note: Note\nThe p1 argument is optional and plots the energy. Without it, the function just returns the energy as number. See documentation energy_at_electron_ct.","category":"page"},{"location":"DOS_lobster_guide/#Adjusting-plot-formatting","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Adjusting plot formatting","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"We can adjust plot formatting by reaching into the PlotlyJS package's relayout! function. Below is an example of formatting you might consider.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"PlotDFT.relayout!(\n    p3,\n    yaxis_title_text = \"E-<i>E</i><sub>F</sub> (eV)\",\n    xaxis_showticklabels = false,\n    xaxis_ticks = \"\",\n);","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"The first argument must be the plot object (in this case, p3), while the rest are optional. In this example, a title is added and centered, as well as titles for the axes. In addition, the legend is turned off. See https://plotly.com/julia/reference/layout/ for a list of options!","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"(Image: IrIn3 projected density of states)","category":"page"},{"location":"DOS_lobster_guide/#Saving-the-figure","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Saving the figure","text":"","category":"section"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"PlotlyJS can save figures in the following file formats:","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":".pdf\n.html\n.json\n.png\n.svg\n.jpeg\n.webp","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"PlotDFT.savefig(p3, width=400, height=800, \"IrIn3_lobDOS.svg\")","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"Oftentimes, PlotlyJS will not save your figure in the displayed dimensions, so it's recommended to specify the dimensions (in pixels) in the arguments. You can also optionally specify a scale (see documentation). The last argument is a string corresponding to the path, filename, and file format of the plot.","category":"page"},{"location":"DOS_lobster_guide/","page":"Guide: DOS with LOBSTER (IrIn₃)","title":"Guide: DOS with LOBSTER (IrIn₃)","text":"note: Note\nFor the purpose of post-processing (with graphics-editing programs like Photoshop, Illustrator, or Affinity), it is recommended to export these figures as vector-based formats, such as SVG or PDF. Beware that some programs cannot open or import SVG files, so PDF is generally more accessible.","category":"page"},{"location":"DOS_ref/#Density-of-States-(DOS)","page":"Docstrings","title":"Density of States (DOS)","text":"","category":"section"},{"location":"DOS_ref/","page":"Docstrings","title":"Docstrings","text":"Functions relevant to the plotting DOS distributions.","category":"page"},{"location":"DOS_ref/","page":"Docstrings","title":"Docstrings","text":"import_DOS_VASP\nimport_DOS_lobster\nPlotDFT.DOSinfo\nplot_DOS\nplot_pDOS\ndos_layout\nnum_electrons_at_energy\nenergy_at_electron_ct","category":"page"},{"location":"DOS_ref/#PlotDFT.import_DOS_VASP","page":"Docstrings","title":"PlotDFT.import_DOS_VASP","text":"import_DOS_VASP(directory::AbstractString==\"\") -> DOSinfo\n\nImports information for plotting DOS from the VASP files DOSCAR, POSCAR, and OUTCAR and returns it as a DOSinfo object.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.import_DOS_lobster","page":"Docstrings","title":"PlotDFT.import_DOS_lobster","text":"import_DOS_lobster(directory::AbstractString==\"\") -> DOSinfo\n\nImports information for plotting DOS from DOSCAR.lobster and POSCAR\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.DOSinfo","page":"Docstrings","title":"PlotDFT.DOSinfo","text":"DOSinfo(\n    tdos::DensityOfStates,\n    pdos::Vector{ProjectedDensityOfStates},\n    fermi::Real,\n    alphabeta::Real,\n    pos::PeriodicAtomList{3},\n    )\n\nOrganizes information relevant to the plotting of the electronic density of states.     See Electrum.jl's documentation for information about DensityOfStates,     ProjectedDensityOfStates, and PeriodicAtomList.\n\n\n\n\n\n","category":"type"},{"location":"DOS_ref/#PlotDFT.plot_DOS","page":"Docstrings","title":"PlotDFT.plot_DOS","text":"plot_DOS(\n    dosinfo::DOSinfo;\n    emin::Real=0,\n    emax::Real=0,\n    xmax::Real=0,\n    eaxis::String=\"relative\"\n)\n-> PlotlyJS.SyncPlot\n\nReturns a plot of the total density of states.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.plot_pDOS","page":"Docstrings","title":"PlotDFT.plot_pDOS","text":"plot_pDOS(\n    plot::PlotlyJS.SyncPlot,\n    dosinfo::DOSinfo;\n    atom::Int,\n    pdos::String,\n    color::String=\"black\")\n-> PlotlyJS.SyncPlot\n\nAdds a filled projected density of states to a given plot.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.dos_layout","page":"Docstrings","title":"PlotDFT.dos_layout","text":"dos_layout(emin::Real, emax::Real, xmax::Real)\n\nReturns a PlotlyJS layout object with default settings and ranges specified by emin/emax/xmax.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.num_electrons_at_energy","page":"Docstrings","title":"PlotDFT.num_electrons_at_energy","text":"num_electrons_at_energy(tdos::DensityOfStates, energy::Real) -> Float64\n\nReturns the electron count of the unit cell at a specified energy using the total DOS.\n\n\n\n\n\n","category":"function"},{"location":"DOS_ref/#PlotDFT.energy_at_electron_ct","page":"Docstrings","title":"PlotDFT.energy_at_electron_ct","text":"energy_at_electron_ct(dosinfo::DOSinfo, electron_ct::Real) -> Float64\n\nReturns the energy of corresponding electron count using the total DOS.\n\n\n\n\n\nenergy_at_electron_ct(\n    dosinfo::DOSinfo,\n    electron_ct::Real,\n    plot::PlotlyJS.SyncPlot;\n    color::String=\"red\"\n)\n-> PlotlyJS.SyncPlot\n\nAdds a horizontal dotted line to a plot corresponding to the energy at a specified electron count.\n\n\n\n\n\n","category":"function"},{"location":"#PlotDFT.jl","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Scripts for plotting basic DFT data from VASP with Julia. Plots can be exported in any of the formats allowed by PlotlyJS for post-processing, including .pdf, .html, .json, .png, .svg, .jpeg, and .webp.","category":"page"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"(Image: Sc 3d Projected Density of States of AuCu3-type ScAl3)","category":"page"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"See examples for more detail.","category":"page"},{"location":"#Dependencies","page":"PlotDFT.jl","title":"Dependencies","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Electrum.jl for reading DFT data\nPlotlyJS for plotting","category":"page"},{"location":"#Current-features","page":"PlotDFT.jl","title":"Current features","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Plot the total DOS and projected DOS (l- and lm- decomposed) from VASP's outputs\nPlot DOS from files generated from LOBSTER","category":"page"},{"location":"#Planned-features","page":"PlotDFT.jl","title":"Planned features","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Customize legend\nPlot spin-polarized DOS.\nPlot band structures.\nPlot -pCOHP curves from LOBSTER.\nPlot phonon DOS and band structures.","category":"page"},{"location":"#Installation","page":"PlotDFT.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"If you haven't already, install Julia.","category":"page"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"Open the Julia REPL and access the package manager by typing ]. Add PlotDFT.jl.","category":"page"},{"location":"","page":"PlotDFT.jl","title":"PlotDFT.jl","text":"(@v1.8) pkg> add https://github.com/xamberl/PlotDFT.git","category":"page"},{"location":"DOS_guide/#Prepare-files-and-use-PlotDFT","page":"Guide: DOS with VASP (ScAl₃)","title":"Prepare files and use PlotDFT","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"We'll walk through the PDOS_ScAl3 example.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"To plot DOS data, we need to read information from three VASP files:","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"OUTCAR - the Fermi energy\nPOSCAR - crystallographic geometry\nDOSCAR - the DOS distributions","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Copy these files from the examples into a working directory. Open the Julia REPL in your working directory and load PlotDFT.jl","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"using PlotDFT","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"note: Note\nIt is recommended to write these commands in a .jl file, so that commands to generate your plot are saved and can be rerun. See the example PDOS_ScAl3.jl.","category":"page"},{"location":"DOS_guide/#Importing-data-from-files","page":"Guide: DOS with VASP (ScAl₃)","title":"Importing data from files","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Now we must extract the relevant data from our VASP files. To do this, we use import_DOS_VASP.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"dos = import_DOS_VASP()","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"By default, it will check the current directory for the three files. If your files are in another directory, you can specify the directory as an argument.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"dos = import_DOS_VASP(\"/path/to/files\")","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"The relevant information is stored into our dos variable, which is a PlotDFT.DOSinfo struct. You can see information about our system.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"DOSinfo: Al₃Sc\n Atom type 1: Sc\n Projected DOS is l-decomposed: (1) s, (2) p, (3) d\n Atom type 2: Al\n Projected DOS is l-decomposed: (1) s, (2) p, (3) d\n Fermi energy: 7.2264, α+β: -14.5222","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Here, we see the chemical formula of the system, the order of the atoms as listed in the POSCAR, information about the projected DOS (if included), and the Fermi energy.","category":"page"},{"location":"DOS_guide/#Plotting-the-total-density-of-states","page":"Guide: DOS with VASP (ScAl₃)","title":"Plotting the total density of states","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"We now can use plot_DOS to generate a total DOS distribution and store the plot object in the variable p1.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"p1 = plot_DOS(dos)","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"(Image: Total DOS distribution of ScAl3)","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"By default, the energies will be plotted relative to the Fermi energy (E-E<sub>F</sub>), ranging from the minimum DOS energy to 1 eV + the Fermi energy. The x-axis will range from 0 to 1.1 * the maximum states per eV. These can be modified with arguments to the function.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"p1_abs = plot_DOS(dos, emin = -17, emax = -7, xmax = 4, eaxis = \"absolute\")","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"(Image: Total DOS distribution of ScAl3, in absolute energy units)","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Now, I've specified our energy axis to be plotted in absolute units (as opposed to relative units), as well as modified the range of the energy and states axes.","category":"page"},{"location":"DOS_guide/#Plotting-the-projected-density-of-states","page":"Guide: DOS with VASP (ScAl₃)","title":"Plotting the projected density of states","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Let's plot the projected density of states corresponding to the Sc 3d bands. Again, we can look at dos to see what type of information is available.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"DOSinfo: Al₃Sc\n Atom type 1: Sc\n Projected DOS is l-decomposed: (1) s, (2) p, (3) d\n Atom type 2: Al\n Projected DOS is l-decomposed: (1) s, (2) p, (3) d\n Fermi energy: 7.2264, α+β: -14.5222","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"The relevant information corresponds to Sc, atom type 1. Our DOSCAR holds l-decomposed projected DOS information, and the options s, p, and d are available. We can now use plot_pDOS with our total density of states plot.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"p1 = PlotDFT.plot_pDOS(p1, dos, atom=1, pdos=\"d\", color=\"#FF0000\")","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Here, the required arguments are p1 and dos, corresponding to our total density of states plot and information about our system, respectively. Additionally, we need to specify what atom we use with atom=1 and which pdos to plot with pdos=\"d\". The only optional argument here is the color. The default color is black; here, it is a string corresponding to the hexadecimal for red.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"(Image: Projected DOS distribution of Sc 3d bands in ScAl3)","category":"page"},{"location":"DOS_guide/#Adjusting-plot-formatting","page":"Guide: DOS with VASP (ScAl₃)","title":"Adjusting plot formatting","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"We can adjust plot formatting by reaching into the PlotlyJS package's relayout! function. Below is an example of formatting you might consider.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"PlotDFT.relayout!(\n    p2,\n    title_text = \"DOS distribution of AuCu<sub>3</sub>-type ScAl<sub>3</sub>\",\n    title_x = 0.5,\n    xaxis_title_text = \"states per eV\",\n    yaxis_title_text = \"Energy (eV)\",\n    showlegend = false\n)","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"The first argument must be the plot object (in this case, p2), while the rest are optional. In this example, a title is added and centered, as well as titles for the axes. In addition, the legend is turned off. See https://plotly.com/julia/reference/layout/ for a list of options!","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"(Image: Sc 3d Projected Density of States of AuCu3-type ScAl3)","category":"page"},{"location":"DOS_guide/#Saving-the-figure","page":"Guide: DOS with VASP (ScAl₃)","title":"Saving the figure","text":"","category":"section"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"PlotlyJS can save figures in the following file formats:","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":".pdf\n.html\n.json\n.png\n.svg\n.jpeg\n.webp","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"PlotDFT.savefig(p2, width=400, height=800, \"ScAl3_Sc_d_pdos.svg\")","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"Oftentimes, PlotlyJS will not save your figure in the displayed dimensions, so it's recommended to specify the dimensions (in pixels) in the arguments. You can also optionally specify a scale (see documentation). The last argument is a string corresponding to the path, filename, and file format of the plot.","category":"page"},{"location":"DOS_guide/","page":"Guide: DOS with VASP (ScAl₃)","title":"Guide: DOS with VASP (ScAl₃)","text":"note: Note\nFor the purpose of post-processing (with graphics-editing programs like Photoshop, Illustrator, or Affinity), it is recommended to export these figures as vector-based formats, such as SVG or PDF. Beware that some programs cannot open or import SVG files, so PDF is generally more accessible.","category":"page"}]
}
