import React from 'react'
import x3 from "../3x3.jpg"

function Nulla() {
    return (
        <div className='nulla'>
            <div className="h60">
                <div className="w60">
                    <h1>Nulla commodo aliqua aliqua ut</h1>
                    <div className='readhover'>
                        <div className="read">
                            <h5>Lorem quis sunt magna dolor consectetur aliqua officia laborum reprehenderit</h5>
                            <a href="#">Read more</a>
                        </div>
                        <div className="read">
                            <h5>Lorem quis sunt magna dolor consectetur aliqua officia laborum reprehenderit</h5>
                            <a href="#">Read more</a>
                        </div>
                    </div>
                </div>
                <div className="w40">
                    <img src={x3} alt="" />
                </div>
            </div>

            <div className="h40">
                <div className="w60">
                    <h1>Nulla ut ea</h1>
                    <div className='readhover'>
                        <div className="read">
                            <h5>Reprehenderit esse labore id veniam ut veniam non ex adipisicing amet ullamco dolor proident. Exercitation velit ea incididunt</h5>
                        </div>
                    </div>
                </div>
                <div className="w40">
                    <div className="left">
                        <h3>Graphic Design</h3>
                        <br />
                        <h3>UX Design</h3>
                        <br />
                        <h3>Prototyping</h3>
                        <br />
                        <h3>Webflow</h3>
                    </div>
                    <div className="right">
                        <h3>Branding</h3>
                        <br />
                        <h3>Coding</h3>
                        <br />
                        <h3>Back-End</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nulla