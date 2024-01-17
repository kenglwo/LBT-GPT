import React from "react";
import CellTable from "./cell_table";
import MyAccordion from "./my_accordion";
import CopyrightHeader from "./copyright";

function CellBiology() {
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h1>2.1 Parts of the Cell</h1>
        <div style={{marginLeft: 'auto'}}><CopyrightHeader/></div>
      </div>
      <h2>Lesson</h2>
      <div className="hline"></div>
      <h4>What you will learn</h4>
      <ul>
        <li>How and when cells were discovered</li>
        <li>The cell theory</li>
        <li>How diverse are cells</li>
        <li>What parts are common among all living cells</li>
      </ul>
      <div className="hline"></div>
      <div style={{ marginBottom: "18px" }}>
        <img
          alt=""
          data-aligned="left"
          data-imageresourceid="13524932"
          data-imagetype="inline"
          id="x-ck12-MTM1MjQ5MzI="
          data-flx-url="/flx/show/THUMB_POSTCARD/image/user%3Aaw50zxjhy3rpdmutywrtaw5ay2sxmi5vcmc./2.1.1-%283%29.png"
          src="https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3A4e29fa0718d876f8ed6b3c8c524261075b3e3c9267e8c1841138fa43%2BIMAGE_THUMB_POSTCARD_TINY%2BIMAGE_THUMB_POSTCARD_TINY.1"
          loading="lazy"
          width="500"
          height="376"
        />
      </div>
      <h4>
        <strong>
          What do a bacterial cell and one of your cells have in common?
        </strong>
      </h4>
      <p>
        There are many different types of cells, but they all have certain parts
        in common. As this image of human blood shows, cells come in different
        shapes and sizes. The shapes and sizes directly influence the function
        of the cell. Yet, all cells - cells from the smallest bacteria to those
        in the largest whale - do some similar functions, so they do have parts
        in common.
      </p>
      <h3>Common Parts of Cells</h3>
      <h4>Discovery of Cells</h4>
      <p>
        The first time the word <em>cell</em> was used to refer to these tiny
        units of life was in 1665 by a British scientist named Robert Hooke.
        Hooke was one of the earliest scientists to study living things under a
        microscope. The microscopes of his day were not very strong, but Hooke
        was still able to make an important discovery. When he looked at a thin
        slice of cork under his microscope, he was surprised to see what looked
        like a honeycomb, made up of many tiny units, which Hooke called cells.
      </p>
      <div style={{ textAlign: "center" }}>
        <figure>
          <img
            alt=""
            data-imageresourceid="13518508"
            data-imagetype="figure"
            id="x-ck12-MTM1MTg1MDg="
            data-flx-url="//www.ck12.org/flx/show/THUMB_POSTCARD/image/user%3Aaw50zxjhy3rpdmutywrtaw5ay2sxmi5vcmc./2.1.2-%281%29.png"
            src="https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3Afd21c0da61b887f214cded9a8269c807aa5f5947b7167b2a9d041b0a%2BIMAGE_THUMB_POSTCARD_TINY%2BIMAGE_THUMB_POSTCARD_TINY.1"
            loading="lazy"
            data-onerror="null"
            width="500"
            height="376"
          />
          <div className="image-figure"></div>
          <figcaption>
            Illustration of cork cells. What type of material is cork? Do you
            know where cork comes from?
          </figcaption>
        </figure>
      </div>
      <p>
        Soon after Robert Hooke discovered cells in cork, Anton van Leeuwenhoek
        in Holland made other important discoveries using a microscope.
        Leeuwenhoek made his own microscope lenses, and he was so good at it
        that his microscope was more powerful than other microscopes of his day.
        In fact, Leeuwenhoek’s microscope was almost as strong as modern light
        microscopes.
      </p>
      <p>
        Using his microscope, Leeuwenhoek discovered tiny animals such as
        rotifers. Leeuwenhoek also discovered human blood cells. He even scraped
        plaque from his own teeth and observed it under the microscope. What do
        you think Leeuwenhoek saw in the plaque? He saw tiny living things with
        a single cell that he named <em>animalcules</em> (“tiny animals”). 
        Today, we call Leeuwenhoek’s animalcules bacteria.
      </p>
      <h4>The Cell Theory</h4>
      <p>
        The cell theory is one of the fundamental theories of biology. For two
        centuries after the discovery of the microscope by Robert Hooke and
        Anton van Leeuwenhoek, biologists found cells everywhere. Biologists in
        the early part of the 19<sup>th</sup> century suggested that all living
        things were made of cells, but the role of cells as the primary building
        block of life was not discovered until 1839 when two German scientists,
        Theodor Schwann, a zoologist (studies animals), and Matthias Jakob
        Schleiden, a botanist (studies plants), suggested that cells were the
        basic unit of structure and function of all life. Later, in 1858, the
        German doctor Rudolf Virchow observed that cells divide to produce more
        cells. He proposed that all cells arise only from other cells. The
        collective observations of all three scientists form the cell theory,
        which states that:
      </p>
      <ul>
        <li>all organisms are made up of one or more cells,</li>
        <li>all the life functions of an organism occur within cells,</li>
        <li>all cells come from preexisting cells.</li>
      </ul>
      <h4>Cell Diversity</h4>
      <p>
        Cells with different functions often have different shapes. The cells
        pictured in the <strong>Figure</strong> below are just a few examples of
        the many different shapes that cells may have. Each type of cell in the
        figure has a shape that helps it do its job. For example, the job of the
        nerve cell is to carry messages to other cells. The nerve cell has many
        long extensions that reach out in all directions, allowing it to pass
        messages to many other cells at once. Do you see the tail-like
        projections on the algae cells? Algae live in water, and their tails
        help them swim. Pollen grains have spikes that help them stick to
        insects such as bees. How do you think the spikes help the pollen grains
        do their job? (<em>Hint:</em>
        Insects pollinate flowers.)
      </p>
      <CellTable />
      <h4>Common Parts of a Cell</h4>
      <p>
        Although cells are diverse, all cells have certain parts in common. The
        parts include a plasma membrane, cytoplasm, ribosomes, cytoskeleton, and
        DNA.
      </p>
      <ol>
        <li>
          The <strong>cell membrane</strong> (also called the{" "}
          <strong>plasma membrane</strong>) is a thin coat of lipids that
          surrounds a cell. It forms the physical boundary between the cell and
          its environment, so you can think of it as the ‘‘skin’’ of the cell.
        </li>
        <li>
          <strong>Cytoplasm</strong> refers to all of the cellular material
          inside the cell membrane, other than the nucleus. Cytoplasm is made up
          of a watery substance called <strong>cytosol</strong> and contains
          other cell structures such as ribosomes.
        </li>
        <li>
          <strong>Ribosomes</strong> are structures in the cytoplasm where
          proteins are made.
        </li>
        <li>
          The <strong>cytoskeleton</strong> consists of filaments and tubules
          that crisscross the cytoplasm and help maintain the cell’s shape.
        </li>
        <li>
          <strong>DNA</strong> is a nucleic acid found in cells. It contains the
          genetic instructions that cells need to make proteins.
        </li>
      </ol>
      <p>
        These parts are common to all cells, from organisms as different as
        bacteria and human beings. How did all known organisms come to have such
        similar cells? The similarities show that all life on Earth has a common
        evolutionary history.
      </p>
      <p>&nbsp;</p>
      <hr />
      <h3 id="x-ck12-UmV2aWV3">Review</h3>
      <ol>
        <li>
          Who coined the term <em>cell</em>, in reference to the tiny structures
          seen in living organisms?
        </li>
        <li>
          Who identified <em>animalcules</em>? What are <em>animalcules</em>?
        </li>
        <li>What are the three main parts of the cell theory?</li>
        <li>List the four parts common to all cells.</li>
        <li>What are the cell structures where proteins are made?</li>
        <li>What is the role of DNA?</li>
      </ol>
      <strong>Source: </strong>
      <a href="https://flexbooks.ck12.org/cbook/ck-12-biology-flexbook-2.0/section/2.1/primary/lesson/common-parts-of-the-cell-bio/" target="_blank" rel="noreferrer">
          <strong>https://flexbooks.ck12.org/cbook/ck-12-biology-flexbook-2.0/section/2.1/primary/lesson/common-parts-of-the-cell-bio/</strong>
      </a>
      <p>&nbsp;</p>
      <div className="hline"></div>
    </div>
  );
}

export default CellBiology;
