import React, { Component, KeyboardEvent, MouseEvent, ChangeEvent } from "react";
import classNames from "classnames";
import Chip from "./chip";
import './chips.scss';

interface ChipsProps {
    values: string[]
}

const Chips = ({ values } : ChipsProps) => (
    <div className={classNames("chips")}>
        { values.filter(val => val != "").map((val, index) => <Chip key={index} value={val} />) }
    </div>);

export default Chips;