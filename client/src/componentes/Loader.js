import React from 'react'

export default function Loader({ show }) {



    return (
        (() => {
            if(show) {
                return (<div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>)
            }
            else {
                return <span></span>
            }
          })()
    )
}
