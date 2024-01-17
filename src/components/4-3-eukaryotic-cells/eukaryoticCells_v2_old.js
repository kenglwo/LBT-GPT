import React from "react";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import ImageWithCaption from "../misc/imageWithCaption";
import PlasmaMembrane from "./images/ee9a602228fcc0f9c392cfa2060950c679b3e5cc.webp";
import Microvilli from "./images/09652b057318f9d78d7061b3c446175b67af2404.webp";
import Nucleus from "./images/de9726d2bc6b966f638a4dd00f3a899bb955c006.webp";
import Chromatin from "./images/05ccf8631f6cae3126e019fc3f466af90652d890.webp";
import Ribosomes from "./images/c2a1ec5fe59a9573e0133deb6a3bea65bacf2f63.webp";

// Source: https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells


function EukaryoticCells() {
  return (
    <div>
      <br></br>
      <Typography variant="h5">Learning Objectives</Typography>
      <Divider></Divider>
      <Typography>By the end of this section, you will be able to do the following:</Typography>
      <ul id="list-00001">
        <li><Typography>Describe the structure of eukaryotic cells</Typography></li>
        <li><Typography>State the role of the plasma membrane</Typography></li>
        <li><Typography>Summarize the functions of the major cell organelles</Typography></li>
      </ul>
      <Typography>“Form follows function” is a philosophy that many industries follow. In architecture, this means that buildings should be constructed to support the activities housed within them. For example, a skyscraper should include several elevator banks. A hospital should have an easily accessible emergency room.</Typography>
      <br></br>
      <Typography>Our natural world also utilizes the principle of form following function, especially in cell biology, as we can see with eukaryotic cell structure.: 1) a membrane-bound nucleus; 2) numerous membrane-bound <b>organelles</b>; and , it has a “true .</Typography>
      <br></br>
      <br></br>
      <Typography>Before turning to organelles, let’s first examine two important components of the cell: the plasma membrane and the cytoplasm. </Typography>
      <br></br>
      <Typography variant="h5">Ribosomes</Typography>
      <Divider></Divider>
      <Typography><b>Ribosomes</b> are the cellular structures responsible for protein synthesis. They may group together into clusters (polyribosomes) or individual ribosomes may float freely in the cytoplasm. They may be attached to the plasma membrane's cytoplasmic side or the endoplasmic reticulum's cytoplasmic side and the nuclear envelope's outer membrane. They are large protein and RNA complexes, each consisting of two subunits, large and small (Figure 5). Ribosomes receive their “orders” for protein synthesis from the nucleus where the DNA transcribes into messenger RNA (mRNA). The mRNA travels to the ribosomes, which translate the code provided by the sequence of the nitrogenous bases in the mRNA into a specific order of amino acids linked together. Amino acids are the building blocks of proteins.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={Ribosomes}
        number="5"
        caption="A large subunit (top) and a small subunit (bottom) comprise ribosomes. During protein synthesis, ribosomes assemble amino acids into proteins."
        width="350px"
        height="283px"/>
      <br></br>
      <Typography>Because proteins have a wide variety of essential cellular functions (including as enzymes, hormones, antibodies, pigments, structural components, and surface receptors), ribosomes are in every cell. Ribosomes are particularly abundant in cells that synthesize large amounts of protein. For example, the pancreas creates several digestive enzymes, and the cells that produce these enzymes contain many ribosomes. Thus, we see another example of form following function.</Typography>
      <br></br>
      <Typography variant="h5">Mitochondria</Typography>
      <Divider></Divider>
      <Typography><b>Mitochondria</b> (singular = mitochondrion) are bean-shaped structures each with a double membrane that are often called “powerhouses” of cells because they make adenosine triphosphate (ATP), the cell’s main energy-carrying molecule. ATP represents the cell's short-term stored energy. Cellular respiration is the process of making ATP using the chemical energy in glucose and other nutrients. In mitochondria, this process uses oxygen and produces carbon dioxide as waste. In fact, the carbon dioxide that you exhale with every breath comes from the cellular reactions that produce carbon dioxide as a byproduct.</Typography>
      <br></br>
      <Typography>In keeping with our theme of form following function, it is important to note that muscle cells have a very high concentration of mitochondria that produce ATP. Your muscle cells need considerable energy to keep your body moving. When your cells don’t get enough oxygen, they make small amounts of ATP and also produce lactic acid.</Typography>
      <br></br>
      <Typography variant="h5">Peroxisomes</Typography>
      <Divider></Divider>
      <Typography><b>Peroxisomes</b> are small, round organelles enclosed by single membranes. They carry out oxidation reactions that break down fatty acids and amino acids. They also detoxify many poisons that may enter the body. (Many of these oxidation reactions release hydrogen peroxide, H2O2, which would be damaging to cells; however, when these reactions are confined to peroxisomes, enzymes safely break down the H2O2 into oxygen and water.) For example, peroxisomes in liver cells detoxify alcohol.</Typography>
      <br></br>
      <hr></hr>
      <Typography variant="caption" display="block" gutterBottom>
          <b>Material Attribution</b>: Access for free at https://openstax.org/books/biology-2e/pages/1-introduction 
      </Typography>
    </div>
  );
}

export default EukaryoticCells;
