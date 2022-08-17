import React from "react";
import classNames from "classnames";
import './chips.scss';

interface ChipProps {
    value: string
}

const Chip = ({ value } : ChipProps) => (
    <div className={classNames("chip")}>
        { value }
    </div>);

export default Chip;