import React from "react";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import ImageWithCaption from "../misc/imageWithCaption";
import PlasmaMembrane from "./images/ee9a602228fcc0f9c392cfa2060950c679b3e5cc.webp";
import Nucleus from "./images/de9726d2bc6b966f638a4dd00f3a899bb955c006.webp";
import Chromatin from "./images/05ccf8631f6cae3126e019fc3f466af90652d890.webp";
import Ribosomes from "./images/c2a1ec5fe59a9573e0133deb6a3bea65bacf2f63.webp";


// Source: https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells


function EukaryoticCells() {
  return (
    <div>
      <br></br>
      <Typography variant="h2">Eukaryotic Cells</Typography>
      <br></br>
      <Typography variant="h5">Learning Objectives</Typography>
      <Divider></Divider>
      <Typography>By the end of this section, you will be able to do the following:</Typography>
      <ul id="list-00001">
        <li><Typography>Describe the structure of eukaryotic cells</Typography></li>
        <li><Typography>State the role of the plasma membrane</Typography></li>
        <li><Typography>Summarize the functions of the major cell organelles</Typography></li>
      </ul>
      <Typography>Have you ever heard the phrase “form follows function?” It’s a philosophy that many industries follow. In architecture, this means that buildings should be constructed to support the activities that will be carried out inside them. For example, a skyscraper should include several elevator banks. A hospital should have its emergency room easily accessible.</Typography>
      <br></br>
      <Typography>Our natural world also utilizes the principle of form following function, especially in cell biology, and this will become clear as we explore eukaryotic cells. Unlike prokaryotic cells, <b>eukaryotic cells</b> have: 1) a membrane-bound nucleus; 2) numerous membrane-bound <b>organelles</b> such as the nucleolus, ribosomes, mitochondria, peroxisomes and others; and 3) several, rod-shaped chromosomes. Because a membrane surrounds eukaryotic cell’s nucleus, it has a “true nucleus.” The word “organelle” means “little organ,” and, as we already mentioned, organelles have specialized cellular functions, just as your body's organs have specialized functions.</Typography>
      <br></br>
      <Typography>At this point, it should be clear to you that eukaryotic cells have a more complex structure than prokaryotic cells. Organelles allow different functions to be compartmentalized in different areas of the cell. Before turning to organelles, let’s first examine two important components of the cell: the plasma membrane and the cytoplasm.</Typography>
      <br></br>
      <Typography variant="h5">The Plasma Membrane</Typography>
      <Divider></Divider>
      <Typography>Like prokaryotes, eukaryotic cells have a <b>plasma membrane</b> (Figure 1), a phospholipid bilayer with embedded proteins that separates the internal contents of the cell from its surrounding environment. A phospholipid is a lipid molecule with two fatty acid chains and a phosphate-containing group. The plasma membrane controls the passage of organic molecules, ions, water, and oxygen into and out of the cell. Wastes (such as carbon dioxide and ammonia) also leave the cell by passing through the plasma membrane.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={PlasmaMembrane} 
        number="1"
        caption="The eukaryotic plasma membrane is a phospholipid bilayer with proteins and cholesterol embedded in it."
        width="600px"
        height="296px"/>
      <br></br>
      <Typography variant="h5">The Cytoplasm</Typography>
      <Divider></Divider>
      <Typography>The <b>cytoplasm</b> is the cell's entire region between the plasma membrane and the nuclear envelope. It is comprised of organelles suspended in the gel-like <b>cytosol</b>, the cytoskeleton, and various chemicals. Even though the cytoplasm consists of 70 to 80 percent water, it has a semi-solid consistency, which comes from the proteins within it. However, proteins are not the only organic molecules in the cytoplasm. Glucose and other simple sugars, polysaccharides, amino acids, nucleic acids, fatty acids, and derivatives of glycerol are also there. Ions of sodium, potassium, calcium, and many other elements also dissolve in the cytoplasm. Many metabolic reactions, including protein synthesis, take place in the cytoplasm.</Typography>
      <br></br>
      <Typography variant="h5">The Nucleus</Typography>
      <Divider></Divider>
      <Typography>Typically, the nucleus is the most prominent organelle in a cell. The <b>nucleus</b> (plural = nuclei) houses the cell’s DNA and directs the synthesis of ribosomes and proteins. Let’s look at it in more detail (Figure 2).</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Nucleus} 
        number="2"
        caption="The nucleus stores chromatin (DNA plus proteins) in a gel-like substance called the nucleoplasm. The nucleolus is a condensed chromatin region where ribosome synthesis occurs."
        width="350px"
        height="236px"/>
      <br></br>
      <Typography variant="h7">Chromatin and Chromosomes</Typography>
      <Divider></Divider>
      <Typography>To understand chromatin, it is helpful to first explore <b>chromosomes</b>, structures within the nucleus that are made up of DNA, the hereditary material. Every eukaryotic species has a specific number of chromosomes in the nucleus of each cell. For example, in humans, the chromosome number is 46, while in fruit flies, it is eight. Chromosomes are only visible and distinguishable from one another when the cell is getting ready to divide. When the cell is in the growth and maintenance phases of its life cycle, proteins attach to chromosomes, and they resemble an unwound, jumbled bunch of threads. We call these unwound protein-chromosome complexes <b>chromatin</b> (Figure 3). Chromatin describes the material that makes up the chromosomes both when condensed and decondensed.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Chromatin}
        number="3"
        caption="(a) This image shows various levels of chromatin's organization (DNA and protein). (b) This image shows paired chromosomes. (credit b: modification of work by NIH; scale-bar data from Matt Russell)"
        width="482px"
        height="247px"/>
      <br></br>
      <Typography variant="h7">The Nucleolus</Typography>
      <Divider></Divider>
      <Typography>We already know that the nucleus directs the synthesis of ribosomes, but how does it do this? Some chromosomes have sections of DNA that encode ribosomal RNA. A darkly staining area within the nucleus called the <b>nucleolus</b> (plural = nucleoli) aggregates the ribosomal RNA with associated proteins to assemble the ribosomal subunits that are then transported out through the pores in the nuclear envelope to the cytoplasm.</Typography>
      <br></br>
      <Typography variant="h5">Ribosomes</Typography>
      <Divider></Divider>
      <Typography><b>Ribosomes</b> are the cellular structures responsible for protein synthesis. When we view them through an electron microscope, ribosomes appear either as clusters (polyribosomes) or single, tiny dots that float freely in the cytoplasm. They may be attached to the plasma membrane's cytoplasmic side or the endoplasmic reticulum's cytoplasmic side and the nuclear envelope's outer membrane. Electron microscopy shows us that ribosomes, which are large protein and RNA complexes, consist of two subunits, large and small (Figure 4). Ribosomes receive their “orders” for protein synthesis from the nucleus where the DNA transcribes into messenger RNA (mRNA). The mRNA travels to the ribosomes, which translate the code provided by the sequence of the nitrogenous bases in the mRNA into a specific order of amino acids in a protein. Amino acids are the building blocks of proteins.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Ribosomes}
        number="4"
        caption="A large subunit (top) and a small subunit (bottom) comprise ribosomes. During protein synthesis, ribosomes assemble amino acids into proteins."
        width="350px"
        height="283px"/>
      <br></br>
      <Typography>Because protein synthesis is an essential function of all cells (including enzymes, hormones, antibodies, pigments, structural components, and surface receptors), there are ribosomes in practically every cell. Ribosomes are particularly abundant in cells that synthesize large amounts of protein. For example, the pancreas is responsible for creating several digestive enzymes and the cells that produce these enzymes contain many ribosomes. Thus, we see another example of form following function.</Typography>
      <br></br>
      <Typography variant="h5">Mitochondria</Typography>
      <Divider></Divider>
      <Typography>Scientists often call <b>mitochondria</b> (singular = mitochondrion) “powerhouses” or “energy factories” of both plant and animal cells because they are responsible for making adenosine triphosphate (ATP), the cell’s main energy-carrying molecule. ATP represents the cell's short-term stored energy. Cellular respiration is the process of making ATP using the chemical energy in glucose and other nutrients. In mitochondria, this process uses oxygen and produces carbon dioxide as a waste product. In fact, the carbon dioxide that you exhale with every breath comes from the cellular reactions that produce carbon dioxide as a byproduct.</Typography>
      <br></br>
      <Typography variant="h5">Peroxisomes</Typography>
      <Divider></Divider>
      <Typography><b>Peroxisomes</b> are small, round organelles enclosed by single membranes. They carry out oxidation reactions that break down fatty acids and amino acids. They also detoxify many poisons that may enter the body. (Many of these oxidation reactions release hydrogen peroxide, H2O2, which would be damaging to cells; however, when these reactions are confined to peroxisomes, enzymes safely break down the H2O2 into oxygen and water.) For example, peroxisomes in liver cells detoxify alcohol. Glyoxysomes, which are specialized peroxisomes in plants, are responsible for converting stored fats into sugars. Plant cells contain many different types of peroxisomes that play a role in metabolism, pathogene defense, and stress response, to mention a few.</Typography>
      <br></br>
      <hr></hr>
      <Typography variant="caption" display="block" gutterBottom>
          <b>Material Attribution</b>: Access for free at https://openstax.org/books/biology-2e/pages/1-introduction 
      </Typography>
    </div>
  );
}

// Separate part comparing Animal and Plant cells
/*
     <Typography variant="h5">Vesicles and Vacuoles</Typography>
      <Divider></Divider>
      <Typography><b>Vesicles</b> and <b>vacuoles</b> are membrane-bound sacs that function in storage and transport. Other than the fact that vacuoles are somewhat larger than vesicles, there is a very subtle distinction between them. Vesicle membranes can fuse with either the plasma membrane or other membrane systems within the cell. Additionally, some agents such as enzymes within plant vacuoles break down macromolecules. The vacuole's membrane does not fuse with the membranes of other cellular components.</Typography>
      <br></br>
      <Typography>The central vacuole also supports the cell's expansion. When the central vacuole holds more water, the cell becomes larger without having to invest considerable energy in synthesizing new cytoplasm.</Typography>
      <br></br>
      <br></br>
      <Typography variant="h5">Animal Cells versus Plant Cells</Typography>
      <Divider></Divider>
      <Typography>At this point, you know that each eukaryotic cell has a plasma membrane, cytoplasm, a nucleus, ribosomes, mitochondria, peroxisomes, and in some, vacuoles, but there are some striking differences between animal and plant cells. While both animal and plant cells have microtubule organizing centers (MTOCs), animal cells also have centrioles associated with the MTOC: a complex we call the centrosome. Animal cells each have a centrosome and lysosomes; whereas, most plant cells do not. Plant cells have a cell wall, chloroplasts and other specialized plastids, and a large central vacuole; whereas, animal cells do not.</Typography>
      <br></br>
      <Typography variant="h6">The Centrosome</Typography>
      <Divider></Divider>
      <Typography>The <b>centrosome</b> is a microtubule-organizing center found near the nuclei of animal cells. It contains a pair of centrioles, two structures that lie perpendicular to each other (Figure 4.15). Each centriole is a cylinder of nine triplets of microtubules.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Centrosome}
        number="7"
        caption=" The centrosome consists of two centrioles that lie at right angles to each other. Each centriole is a cylinder comprised of nine triplets of microtubules. Nontubulin proteins (indicated by the green lines) hold the microtubule triplets together."
        width="350px"
        height="212px"/>
      <br></br>
      <Typography>The centrosome (the organelle where all microtubules originate) replicates itself before a cell divides, and the centrioles appear to have some role in pulling the duplicated chromosomes to opposite ends of the dividing cell. However, the centriole's exact function in cell division isn’t clear, because cells that have had the centrosome removed can still divide, and plant cells, which lack centrosomes, are capable of cell division.</Typography>
      <br></br>
      <Typography variant="h6">Lysosomes</Typography>
      <Divider></Divider>
      <Typography>Animal cells have another set of organelles that most plant cells do not: lysosomes. The <b>lysosomes</b> are the cell’s “garbage disposal.” In plant cells, the digestive processes take place in vacuoles. Enzymes within the lysosomes aid in breaking down proteins, polysaccharides, lipids, nucleic acids, and even worn-out organelles. These enzymes are active at a much lower pH than the cytoplasm's. Therefore, the pH within lysosomes is more acidic than the cytoplasm's pH. Many reactions that take place in the cytoplasm could not occur at a low pH, so again, the advantage of compartmentalizing the eukaryotic cell into organelles is apparent.</Typography>
      <br></br>
      <Typography variant="h6">The Cell Wall</Typography>
      <Divider></Divider>
      <Typography>If you examine Figure 4.8, the plant cell diagram, you will see a structure external to the plasma membrane. This is the <b>cell wall</b>, a rigid covering that protects the cell, provides structural support, and gives shape to the cell. Fungal and some protistan cells also have cell walls. While the prokaryotic cell walls' chief component is peptidoglycan, the major organic molecule in the plant (and some protists') cell wall is cellulose (Figure 4.16), a polysaccharide comprised of glucose units. Have you ever noticed that when you bite into a raw vegetable, like celery, it crunches? That’s because you are tearing the celery cells' rigid cell walls with your teeth.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Cellulose}
        number="8"
        caption="Cellulose is a long chain of β-glucose molecules connected by a 1-4 linkage. The dashed lines at each end of the figure indicate a series of many more glucose units. The size of the page makes it impossible to portray an entire cellulose molecule."
        width="430px"
        height="98px"/>
      <br></br>
      <Typography variant="h6">Chloroplasts</Typography>
      <Divider></Divider> 
      <Typography>Like the mitochondria, chloroplasts have their own DNA and ribosomes, but chloroplasts have an entirely different function. <b>Chloroplasts</b> are plant cell organelles that carry out photosynthesis. Photosynthesis is the series of reactions that use carbon dioxide, water, and light energy to make glucose and oxygen. This is a major difference between plants and animals. Plants (autotrophs) are able to make their own food, like sugars used in cellular respiration to provide ATP energy generated in the plant mitochondria. Animals (heterotrophs) must ingest their food.</Typography>
      <br></br>
      <Typography>Like mitochondria, chloroplasts have outer and inner membranes, but within the space enclosed by a chloroplast’s inner membrane is a set of interconnected and stacked fluid-filled membrane sacs we call thylakoids (Figure 4.17). Each thylakoid stack is a granum (plural = grana). We call the fluid enclosed by the inner membrane that surrounds the grana the stroma.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Chloroplast}
        number="9"
        caption=" The chloroplast has an outer membrane, an inner membrane, and membrane structures - thylakoids that are stacked into grana. We call the space inside the thylakoid membranes the thylakoid space. The light harvesting reactions take place in the thylakoid membranes, and sugar synthesis takes place in the fluid inside the inner membrane, which we call the stroma. Chloroplasts also have their own genome, which is contained on a single circular chromosome."
        width="350px"
        height="276px"/>
      <br></br>
      <Typography>The chloroplasts contain a green pigment, <b>chlorophyll</b>, which captures the light energy that drives the reactions of photosynthesis. Like plant cells, photosynthetic protists also have chloroplasts. Some bacteria perform photosynthesis, but their chlorophyll is not relegated to an organelle.</Typography>
      <br></br>
      <Typography variant="h6">The Central Vacuole</Typography>
      <Divider></Divider>
      <Typography>Previously, we mentioned vacuoles as essential components of plant cells. If you look at Figure 4.8b, you will see that plant cells each have a large central vacuole that occupies most of the cell's area. The <b>central vacuole</b> plays a key role in regulating the cell’s concentration of water in changing environmental conditions. Have you ever noticed that if you forget to water a plant for a few days, it wilts? That’s because as the water concentration in the soil becomes lower than the water concentration in the plant, water moves out of the central vacuoles and cytoplasm. As the central vacuole shrinks, it leaves the cell wall unsupported. This loss of support to the plant's cell walls results in the wilted appearance.</Typography>
*/

export default EukaryoticCells;
