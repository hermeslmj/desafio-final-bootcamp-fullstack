import React, { useEffect } from 'react'

import M from "materialize-css/dist/js/materialize.min.js";


export default function DataRange({ onChangeDateCbk }) {

    const dates = [
        "2019-01",
        "2019-02",
        "2019-03",
        "2019-04",
        "2019-05",
        "2019-06",
        "2019-07",
        "2019-08",
        "2019-09",
        "2019-10",
        "2019-11",
        "2019-12",
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-04",
        "2020-05",
        "2020-06",
        "2020-07",
        "2020-08",
        "2020-09",
        "2020-10",
        "2020-11",
        "2020-12",
        "2021-01",
        "2021-02",
        "2021-03",
        "2021-04",
        "2021-05",
        "2021-06",
        "2021-07",
        "2021-08",
        "2021-09",
        "2021-10",
        "2021-11",
        "2021-12"
    ];

    function onChangeDate(event) {
        const value = event.target.value;
        onChangeDateCbk(value);
    }

    useEffect(() => {
        M.AutoInit();
    }, []);

    return (
        <div className="row">
            <div className="input-field col s12">
                <select defaultValue="" onChange={onChangeDate}>
                    {
                        dates.map((element) => {
                            return <option key={element} value={element}>{element}</option>
                        })
                    }
                </select>
                <label>Selecione um Período</label>
            </div>
        </div>
    )
}



