import React from 'react';
import './Home.css';

const HomePage = () => {
    return (
        <div className="container">
            {/* Section 1: Quality Made at MODEX Helmet Factory */}
            <div className="section">

                <div className="content">
                    <h2>QUALITY MADE AT MODEX HELMET FACTORY</h2>
                    <p>The name MODEX has long been synonymous with “premium” in the motorcycle helmet market—a credential that hundreds of loyal men and women in our factory wear with great pride. The evolution and production of our world-class helmet line is a meticulous process that combines the very latest in technology with consumer feedback, modern testing practices, advanced materials, and nearly 60 years of helmet building experience. Just like the very first MODEX helmet built by our founder back in 1959, every MODEX helmet today is still handmade in our factory utilizing a sophisticated process that involves over 50 people for each and every helmet.</p>
                </div>
                <img src="./images/f.webp" alt="Helmet" className="image" />
            </div>

            {/* Section 2: Shell Molding */}
            <div className="section">
                <div className="content">
                    <h2>SHELL MOLDING</h2>
                    <p>MODEX Helmet Factory's proprietary AIM (Advanced Integrated Matrix) and AIM+ shell molding technology integrates a multi-ply matrix of hand-laid interwoven layers of fiberglass with organic fibers and resin. Together, these materials combine to maximize strength and elasticity in a strong yet lightweight shell, and each is personally marked by the technician responsible for it to further endorse the quality of every helmet.</p>
                </div>
                <img src="./images/2.jpg" alt="Shell Molding" className="image" />
            </div>

            {/* Section 3: Laser Cutting */}
            <div className="section">

                <div className="content">
                    <h2>LASER CUTTING</h2>
                    <p>Robotically controlled lasers give each helmet its final shape by cutting off protrusions created during the shell molding process, as well as creating the openings for eye and ventilation ports. Once this process is complete, all helmets are thoroughly inspected to ensure proper material thickness and weight before moving on to the next phase of manufacturing.</p>
                </div>
                <img src="./images/3.jpg" alt="Laser Cutting" className="image" />
            </div>

            {/* Section 4: Painting & Graphics Application */}
            <div className="section">
                <div className="content">
                    <h2>PAINTING & GRAPHICS APPLICATION</h2>
                    <p>SHOEI’s intricate painting and graphics application procedures are second to none. Combining handwork with state-of-the-art automation processes to ensure optimal quality, each helmet boasts a premium painted finish and hand-applied decals before being sealed and protected with several quality layers of clearcoat. Each and every SHOEI helmet receives up to five layers of paint before final assembly.</p>
                </div>
                <img src="./images/4.jpg" alt="Painting & Graphics Application" className="image" />
            </div>

            {/* Section 5: Fit & Comfort */}
            <div className="section">

                <div className="content">
                    <h2>FIT & COMFORT</h2>
                    <p>SHOEI knows that one size does not fit all, which is why we offer an industry-leading number of shell sizes, as well as various liner sizes and cheek pad thicknesses to ensure a customizable fit for each and every rider. Along with extensive research on head shapes and sizes, SHOEI incorporates a mix of exclusive comfort and performance features into the construction of every helmet.</p>
                </div>
                <img src="./images/5.jpg" alt="Fit & Comfort" className="image" />
            </div>

            {/* Section 6: Final Assembly */}
            <div className="section">
                <div className="content">
                    <h2>FINAL ASSEMBLY</h2>
                    <p>A critical step in the manufacturing process, final helmet assembly is done with care and precision, including the installation of ventilation sliders, shield seals, impact absorbing EPS liners, and comfort interiors. Each helmet passes a detailed final inspection before being passed on to the consumer. This strict compliance with the production processes and associated quality control standards guarantee the consistently high quality of a SHOEI.</p>
                </div>
                <img src="./images/6.jpg" alt="Final Assembly" className="image" />
            </div>

            {/* Section 7: Our Process */}
            <div className="section">
                <h2>Our Process</h2>
                <div className="process">
                    <div className="step">
                        <img src="./images/7.jpg" alt="Priming" className="step-image" />
                        <div>
                            <p><span className="step-number">1.</span> PRIMING</p>
                            <p>After the helmet has been taken from the mold and all protruding parts and openings have been removed by laser, the helmet is given its first priming. Next, each helmet is cleaned, sanded, and polished by hand and machine, producing a flawless surface for the subsequent painting operations. Working on the various helmet shells with their own peculiarities requires a high degree of experience and expertise.</p>
                        </div>
                    </div>
                    <div className="step">
                        <img src="./images/8.jpg" alt="Checking Priming" className="step-image" />
                        <div>
                            <p><span className="step-number">2.</span> CHECKING THE PRIMING</p>
                            <p>The helmet priming is carefully checked by multiple technicians for any small blemishes and then passed on for further painting – but only if the surface is absolutely perfect.</p>
                        </div>
                    </div>
                    <div className="step">
                        <img src="./images/9.jpg" alt="Painting" className="step-image" />
                        <div>
                            <p><span className="step-number">3.</span> PAINTING</p>
                            <p>The quality of a painting operation depends on the quality of its individual painters. It is virtually impossible to apply a high-quality coat of paint by machine, even with the very latest technology and polyurethane paints. For that reason, only specially qualified technicians are used in this process.</p>
                        </div>
                    </div>
                    <div className="step">
                        <img src="./images/10.jpg" alt="Checking Painting" className="step-image" />
                        <div>
                            <p><span className="step-number">4.</span> CHECKING THE PAINTING</p>
                            <p>The paintwork is subjected to close inspection for drips, inclusions, and unevenness before a helmet shell proceeds in the production process.</p>
                        </div>
                    </div>
                    <div className="step">
                        <img src="./images/11.jpg" alt="Applying Design" className="step-image" />
                        <div>
                            <p><span className="step-number">5.</span> APPLYING THE DESIGN</p>
                            <p>Elaborate, extremely detailed, and spectacular graphics are part of the brand image of a MODEX helmet. In a very complicated work step, water decals are applied by hand by specially trained technicians to the finished painted helmet.</p>
                        </div>
                    </div>
                    <div className="step">
                        <img src="./images/13.jpg" alt="Final Application" className="step-image" />
                        <div>
                            <p><span className="step-number">6.</span> PROTECTIVE CLEARCOAT</p>
                            <p>The last step in the painting process is the application of multiple coats of a high-quality clear varnish to the shell to protect the graphics and give the helmet its unmistakable MODEX brilliance.</p>
                        </div>
                    </div>
                    <div className="step">
                        <img src="./images/12.jpg" alt="Final Application" className="step-image" />
                        <div>
                            <p><span className="step-number">7.</span> FINAL APPLICATION</p>
                            <p>Before a painted helmet shell is passed on for final assembly, the finished paintwork is given one last meticulous inspection. Perfection, even in areas that are unnoticeable by the untrained eye, is a must.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 8: Quality Control */}
            <div className="section">
                <div className="content">
                    <h1>QUALITY CONTROL</h1>
                    <p>For all the energy and passion invested into the design and development of a product, the same level of care and due diligence must be achieved during the production process. A number of unique, state-of-the-art processes combine to yield the unrivaled quality that only SHOEI helmets are known for, and each helmet must pass several rigorous inspections throughout production before being awarded with the famous SHOEI hexagon.</p>
                </div>
            </div>

            {/* Section 9: Quality Control Image Right */}
            <div className="section">
                <div className="content">
                    <h1>QUALITY CONTROL</h1>
                    <p>A critical step in the manufacturing process, final helmet assembly is done with care and precision, including the installation of ventilation sliders, shield seals, impact absorbing EPS liners, and comfort interiors. Each helmet passes a detailed final inspection before being passed on to the consumer. This strict compliance with the production processes and associated quality control standards guarantee the consistently high quality of a SHOEI helmet.</p>
                </div>
                <img src="./images/13.jpg" alt="RightImage" className="image" />
            </div>

            {/* Section 10: Quality Control During Production */}
            <div className="section">
                <div className="content">
                    <h1>QUALITY CONTROL DURING PRODUCTION</h1>
                    <p>Strict quality control guidelines at SHOEI are in place during all phases of production, from manufacturing of the outer shell to the point of final assembly. In addition, samples are regularly taken from normal production and tested at SHOEI’s own testing facilities. Every year, more than 3,000 helmets are tested to ensure safety, and destroyed in doing so. These test helmets make a major contribution to the overall safety of our products.</p>
                </div>
                <img src="./images/14.jpg" alt="RightImage" className="image" />
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>Helmet Modex Factory Quality Assurance</p>
            </footer>
        </div>
    );
};

export default HomePage;
