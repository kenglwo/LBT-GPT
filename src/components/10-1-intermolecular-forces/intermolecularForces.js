import React from "react";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import ImageWithCaption from "../misc/imageWithCaption";
import TransitionsOverview from "./images/99c7f7d4b6b2e63894a1a13d4f04329990d6c8ed.webp";
import IntermolForces from "./images/031c6194fc6c4b7316455344ac5144bbd91a33a5.webp";
import DispersionForce from "./images/bb9362f4202d67e6959ca5543ca69a65342f0e08.webp";
import DipoleDipole from "./images/16c35aaa8f6ff0516c9b8b2b3fd951bdf2008360.webp";
import HydrogenBonding from "./images/9d1e6170fc7727642a0fa60bf8f43ed5019bf40c.webp";

// Source: https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces


function IntermolecularForces() {
  return (
    <div>
      <br></br>
      <Typography variant="h5">Learning Objectives</Typography>
      <Divider></Divider>
      <Typography>By the end of this section, you will be able to:</Typography>
      <ul id="list-00001">
        <li><Typography>Describe the types of intermolecular forces possible between atoms or molecules in condensed phases (dispersion forces, dipole-dipole attractions, and hydrogen bonding)</Typography></li>
        <li><Typography>Identify the types of intermolecular forces experienced by specific molecules based on their structures</Typography></li>
        <li><Typography>Explain the relation between the intermolecular forces present within a substance and the temperatures associated with changes in its physical state</Typography></li>
      </ul>
      <Typography>As was the case for gaseous substances, the kinetic molecular theory may be used to explain the behavior of solids and liquids. In the following description, the term particle will be used to refer to an atom, molecule, or ion. Note that we will use the popular phrase “intermolecular attraction” to refer to attractive forces between the particles of a substance, regardless of whether these particles are molecules, atoms, or ions.</Typography>
      <br></br>
      <Typography>Consider these two aspects of the molecular-level environments in solid, liquid, and gaseous matter:</Typography>
      <ul>
        <li><Typography>Particles in a solid are tightly packed together and often arranged in a regular pattern; in a liquid, they are close together with no regular arrangement; in a gas, they are far apart with no regular arrangement.</Typography></li>
        <li><Typography>Particles in a solid vibrate about fixed positions and do not generally move in relation to one another; in a liquid, they move past each other but remain in essentially constant contact; in a gas, they move independently of one another except when they collide.</Typography></li>
      </ul>
      <Typography>The differences in the properties of a solid, liquid, or gas reflect the strengths of the attractive forces between the atoms, molecules, or ions that make up each phase. The phase in which a substance exists depends on the relative extents of its <b>intermolecular forces</b> (IMFs) and the <b>kinetic energies</b> (KE) of its molecules. IMFs are the various forces of attraction that may exist between the atoms and molecules of a substance due to electrostatic phenomena, as will be detailed in this module. These forces serve to hold particles close together, whereas the particles’ KE provides the energy required to overcome the attractive forces and thus increase the distance between particles. Figure 1 illustrates how changes in physical state may be induced by changing the temperature, hence, the average KE, of a given substance.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={TransitionsOverview} 
        number="1"
        caption="Transitions between solid, liquid, and gaseous states of a substance occur when conditions of temperature or pressure favor the associated changes in intermolecular forces. (Note: The space between particles in the gas phase is much greater than shown.)."
        width="495px"
        height="280px"/>
      <br></br>
      <Typography>As an example of the processes depicted in this figure, consider a sample of water. When gaseous water is cooled sufficiently, the attractions between H2O molecules will be capable of holding them together when they come into contact with each other; the gas condenses, forming liquid H2O. For example, liquid water forms on the outside of a cold glass as the water vapor in the air is cooled by the cold glass.</Typography>
      <br></br>
      <Typography variant="h5">Forces between Molecules</Typography>
      <Divider></Divider>
      <Typography>Under appropriate conditions, the attractions between all gas molecules will cause them to form liquids or solids. This is due to intermolecular forces, not intramolecular forces. Intramolecular forces are those within the molecule that keep the molecule together, for example, the bonds between the atoms. Intermolecular forces are the attractions between molecules, which determine many of the physical properties of a substance. Figure 10.5 illustrates these different molecular forces. The strengths of these attractive forces vary widely, though usually the IMFs between small molecules are weak compared to the intramolecular forces that bond atoms together within a molecule. For example, to overcome the IMFs in one mole of liquid HCl and convert it into gaseous HCl requires only about 17 kilojoules. However, to break the covalent bonds between the hydrogen and chlorine atoms in one mole of HCl requires about 25 times more energy—430 kilojoules.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={IntermolForces} 
        number="2"
        caption="Intramolecular forces keep a molecule intact. Intermolecular forces hold multiple molecules together and determine many of a substance’s properties."
        width="495px"
        height="195px"/>
      <br></br>
      <Typography>All of the attractive forces between neutral atoms and molecules are known as <b>van der Waals forces</b>, although they are usually referred to more informally as intermolecular attraction. We will consider the various types of IMFs in the next three sections of this module.</Typography>
      <br></br> 
      <Typography variant="h5">Dispersion Forces</Typography>
      <Divider></Divider>
      <Typography>One of the three van der Waals forces is present in all condensed phases, regardless of the nature of the atoms or molecules composing the substance. This attractive force is called the London dispersion force in honor of German-born American physicist Fritz London who, in 1928, first explained it. This force is often referred to as simply the <b>dispersion force</b>. Because the electrons of an atom or molecule are in constant motion (or, alternatively, the electron’s location is subject to quantum-mechanical variability), at any moment in time, an atom or molecule can develop a temporary, <b>instantaneous dipole</b> if its electrons are distributed asymmetrically. The presence of this dipole can, in turn, distort the electrons of a neighboring atom or molecule, producing an <b>induced dipole</b>. These two rapidly fluctuating, temporary dipoles thus result in a relatively weak electrostatic attraction between the species—a so-called dispersion force like that illustrated in Figure 3.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={DispersionForce} 
        number="3"
        caption="Dispersion forces result from the formation of temporary dipoles, as illustrated here for two nonpolar diatomic molecules."
        width="495px"
        height="368px"/>
      <br></br>
      <Typography>Dispersion forces that develop between atoms in different molecules can attract the two molecules to each other. The forces are relatively weak, however, and become significant only when the molecules are very close. Larger and heavier atoms and molecules exhibit stronger dispersion forces than do smaller and lighter atoms and molecules. In larger atoms, the valence electrons are, on average, farther from the nuclei than in a smaller atoms. Thus, they are less tightly held and can more easily form the temporary dipoles that produce the attraction. The measure of how easy or difficult it is for another electrostatic charge (for example, a nearby ion or polar molecule) to distort a molecule’s charge distribution (its electron cloud) is known as polarizability. The shapes of molecules also affect the magnitudes of the dispersion forces between them. The greater the surface area available for contact between molecules the stronger the corresponding dispersion forces.</Typography>
      <br></br>
      <Typography variant="h5">Dipole-Dipole Attractions</Typography>
      <Divider></Divider>
      <Typography>Recall that polar molecules have a partial positive charge on one side and a partial negative charge on the other side of the molecule—a separation of charge called a dipole. Consider a polar molecule such as hydrogen chloride, HCl. In the HCl molecule, the more electronegative Cl atom bears the partial negative charge, whereas the less electronegative H atom bears the partial positive charge. An attractive force between HCl molecules results from the attraction between the positive end of one HCl molecule and the negative end of another. This attractive force is called a dipole-dipole attraction—the electrostatic force between the partially positive end of one polar molecule and the partially negative end of another, as illustrated in Figure 4.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={DipoleDipole} 
        number="4"
        caption="This image shows two arrangements of polar molecules, such as HCl, that allow an attraction between the partial negative end of one molecule and the partial positive end of another."
        width="495px"
        height="119px"/>
      <br></br>
      <Typography>The effect of a dipole-dipole attraction is apparent when we compare the properties of HCl molecules to nonpolar F2 molecules. Both HCl and F2 consist of the same number of atoms and have approximately the same molecular mass. At a temperature of 150 K, molecules of both substances would have the same average KE. However, the dipole-dipole attractions between HCl molecules are sufficient to cause them to “stick together” to form a liquid, whereas the relatively weaker dispersion forces between nonpolar F2 molecules are not, and so this substance is gaseous at this temperature. The higher normal boiling point of HCl (188 K) compared to F2 (85 K) is a reflection of the greater strength of dipole-dipole attractions between HCl molecules, compared to the attractions between nonpolar F2 molecules. We will often use values such as boiling or freezing points, or enthalpies of vaporization or fusion, as indicators of the relative strengths of IMFs of attraction present within different substances.</Typography>
      <br></br>
      <Typography variant="h5">Hydrogen Bonding</Typography>
      <Divider></Divider>
      <Typography>Nitrosyl fluoride (ONF, molecular mass 49 amu) is a gas at room temperature. Water (H2O, molecular mass 18 amu) is a liquid, even though it has a lower molecular mass. We clearly cannot attribute this difference between the two compounds to dispersion forces. Both molecules have about the same shape and ONF is the heavier and larger molecule. It is, therefore, expected to experience more significant dispersion forces. Additionally, we cannot attribute this difference in boiling points to differences in the dipole moments of the molecules. Both molecules are polar and exhibit comparable dipole moments. The large difference between the boiling points is due to a particularly strong dipole-dipole attraction that may occur when a molecule contains a hydrogen atom bonded to a fluorine, oxygen, or nitrogen atom (the three most electronegative elements). The very large difference in electronegativity between the H atom (2.1) and the atom to which it is bonded (4.0 for an F atom, 3.5 for an O atom, or 3.0 for a N atom), combined with the very small size of a H atom and the relatively small sizes of F, O, or N atoms, leads to highly concentrated partial charges with these atoms. Molecules with F-H, O-H, or N-H moieties are very strongly attracted to similar moieties in nearby molecules, a particularly strong type of dipole-dipole attraction called <b>hydrogen bonding</b>. Examples of hydrogen bonds include HF⋯HF, H2O⋯HOH, and H3N⋯HNH2, in which the hydrogen bonds are denoted by dots. Figure 5 illustrates hydrogen bonding between water molecules.</Typography>
      <br></br>
      <ImageWithCaption
        imageFile={HydrogenBonding} 
        number="3"
        caption="Water molecules participate in multiple hydrogen-bonding interactions with nearby water molecules."
        width="495px"
        height="244px"/>
      <br></br>
      <Typography>Despite use of the word “bond,” keep in mind that hydrogen bonds are intermolecular attractive forces, not intramolecular attractive forces (covalent bonds). Hydrogen bonds are much weaker than covalent bonds, only about 5 to 10% as strong, but are generally much stronger than other dipole-dipole attractions and dispersion forces.</Typography>    
      <br></br>
      <br></br>
      <hr></hr>
      <Typography variant="caption" display="block" gutterBottom>
          <b>Material Attribution</b>: Access for free at https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces
      </Typography>
    </div>
  );
}


export default IntermolecularForces;
