import {useState} from "react";

export default function Player({initialPlayerName, symbol, isActivePlayer, onNameChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialPlayerName);

    function handleEditClick() {
        setIsEditing((editing) => !(editing));
        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    }

    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }

    let editablePlayerName = (<span className="player-name">{playerName}</span>);
    if (isEditing) {
        editablePlayerName = (<input type="text" required value={playerName}
        onChange={handleChange}
        onKeyDown={event => event.key === "Enter" ? handleEditClick() : undefined}/>);
    }

    return (
        <li className={isActivePlayer ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
            </span>
        </li>
    );
}