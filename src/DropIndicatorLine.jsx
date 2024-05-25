/* eslint-disable react/prop-types */

export const DropIndicatorLine = ({ beforeId, column }) => {
    return (<>
                { column ? 
                <div
                    data-before={beforeId || "-1"}
                    data-column={column}
                    className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
                /> : 
                <div
                    data-before={beforeId || "-1"}
                    className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
                /> }
            </>
        );
    };