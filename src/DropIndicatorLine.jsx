/* eslint-disable react/prop-types */

export const DropIndicatorLine = ({ beforeId, column }) => {
    return (
        <div
        data-before={beforeId || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
    };