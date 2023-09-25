import React, { useState } from "react";
import "./App.css";
import GameScreen from "./GameScreen";
import Rules from "./Rules";

function App() {
	const [mainMenu, setMainMenu] = useState(true);
	const [editingMode, setEditingMode] = useState(false);
	const [finishedGame, setFinishedGame] = useState(false);
	const [launchedGame, setLaunchedGame] = useState(false);
	const [addingPlayers, setAddingPlayers] = useState(false);
	const [showInstructions, setShowInstructions] = useState(false);

	const [inputValue, setInputValue] = useState("");

	const [list, setList] = useState([]);
	const uniqueRandomNumbers = new Set();
	const [playersData, setPlayersData] = useState([]);
	const [totalPlayers, setTotalPlayers] = useState(0);
	const [currentPlayerId, setCurrentPlayerId] = useState(0);

	function generateUniqueRandomNumber(max) {
		let randomNumber;
		do {
			randomNumber = Math.floor(Math.random() * max);
		} while (uniqueRandomNumbers.has(randomNumber));
		uniqueRandomNumbers.add(randomNumber);
		return randomNumber;
	}

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddItem = () => {
		if (inputValue.trim() !== "") {
			const inputValueLowerCase = inputValue.toLowerCase();
			if (
				!list.some((item) => item.toLowerCase() === inputValueLowerCase)
			) {
				setList([...list, inputValue]);
				setTotalPlayers(totalPlayers + 1);
			} else {
				alert("Player already added.");
			}
			setInputValue("");
			setEditingMode(false);
		}
	};

	const handleRemoveItem = (index) => {
		const updatedList = [...list];
		updatedList.splice(index, 1);
		setList(updatedList);
		setTotalPlayers(totalPlayers - 1);
		if (totalPlayers < 1) {
			setEditingMode(false);
		}
	};

	const handleEnterKeyPress = (event) => {
		if (event.key === "Enter") {
			handleAddItem();
		}
	};

	const startNewGame = () => {
		setList([]);
		uniqueRandomNumbers.clear();
		setPlayersData([]);
		setTotalPlayers(0);
		setCurrentPlayerId(0);

		setMainMenu(false);
		setFinishedGame(false);
		setShowInstructions(false);
		setLaunchedGame(false);
		setAddingPlayers(true);
	};

	const toggleEditingMode = () => {
		setEditingMode(!editingMode);
	};

	const launchGame = () => {
		const playersData = list.map((player, index) => ({
			player_name: player,
			order: index,
			victim_id: generateUniqueRandomNumber(list.length),
		}));

		console.log(playersData);

		setPlayersData(playersData);
		setAddingPlayers(false);
		setLaunchedGame(true);
	};

	const goBackMainMenu = () => {
		setMainMenu(true);
		setAddingPlayers(false);
		setLaunchedGame(false);
		setFinishedGame(false);
		setShowConfirmation(false);
		setShowInstructions(false);
		setPlayersData([]);
		uniqueRandomNumbers.clear();
		console.log("Back to main menu");
	};

	const onNextPlayer = () => {
		setCurrentPlayerId(currentPlayerId + 1);
		if (currentPlayerId >= playersData.length) {
			setCurrentPlayerId(0);
		}
	};

	const finishGame = () => {
		setFinishedGame(true);
		setLaunchedGame(false);
		setShowInstructions(false);
		setPlayersData([]);
		uniqueRandomNumbers.clear();
		console.log("Game finished");
	};

	const loadInstructions = () => {
		setShowInstructions(true);
		setMainMenu(false);
	};

	function findPlayerNameByVictimId(victimId) {
		var name = "AGAPITO";
		playersData.forEach((player) => {
			console.log(
				player.player_name + " " + player.victim_id + " ¿=? " + victimId
			);
			if (player.victim_id === victimId) {
				name = player.player_name;
			}
		});
		return name;

		// const player = list.find((player) => player.victim_id === victimId);
		// return player ? player.player_name : null;
	}

	// function findPlayerNameByVictimId(playersData, victimId) {
	// 	const player = playersData.find(
	// 		(player) => player.victim_id === victimId
	// 	);
	// 	return player ? player.player_name : null;
	// }
	const [showConfirmation, setShowConfirmation] = useState(false);
	const handleConfirm = () => {
		console.log("handleConfirm");
		if (showInstructions) goBackMainMenu();
		if (addingPlayers) goBackMainMenu();
		if (launchedGame) {

			setShowConfirmation(true);
			setLaunchedGame(false);
		}
	};

	const cancelGoBackMainMenu = () => {
		setShowConfirmation(false);
		setLaunchedGame(true);
	}

	return (
		<div className="App">
			{!mainMenu && !finishedGame && (
				<div className="buttons-top">
					<button
						className="home-button purple-button"
						onClick={handleConfirm}
					>
						<i class="fas fa-home"></i>
					</button>
				</div>
			)}

			<div className="container">
				{showInstructions && <Rules goBackMainMenu={goBackMainMenu} />}
				{showConfirmation && (
					<div className="confirmation">
						<div className="modal-content">
							<p>
								Do you really want to go back to the main menu?
							</p>
							<div className="confirmation-buttons">
								<button
									className="red-button"
									onClick={goBackMainMenu}
								>
									Yes
								</button>
								<button
									className="green-button"
									onClick={cancelGoBackMainMenu}
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}
				{finishedGame && (
					<div className="finish-game">
						<h1>The end</h1>
						<p>All players have their target.</p>
						<p>Good luck and remember...</p>
						<p>
							It's dangerous to go alone!
							<br />
							Take this.
							<br />
							🔥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔥
							<br />
							🗡️
						</p>
						<button
							className="purple-button "
							onClick={goBackMainMenu}
						>
							Go back to main menu
						</button>
					</div>
				)}
				{launchedGame && (
					<GameScreen
						playersData={playersData}
						currentPlayerId={currentPlayerId}
						onNextPlayer={onNextPlayer}
						findPlayerNameByVictimId={findPlayerNameByVictimId}
						finishGame={finishGame}
					/>
				)}
				{addingPlayers && (
					<div className="adding-players">
						{!editingMode && <h1>PLAYER LIST</h1>}
						{editingMode && <h1>PLAYER LIST <i class="far fa-edit"></i></h1>}
						<ul className="player-list">
							{list.map((item, index) => (
								<li key={index}>
									<span className="player-name">{item}</span>
									{editingMode && (
										<button
											onClick={() =>
												handleRemoveItem(index)
											}
											className="remove-button emoji-button"
										>
											❌
										</button>
									)}
								</li>
							))}
						</ul>
						{totalPlayers > 0 && (
							<div className="total-players">
								Total players:{" "}
								<span className="total-players-number">
									{totalPlayers}
								</span>
							</div>
						)}
						{editingMode && (
							<p className="infoEdit">
								Press ❌ to remove a player.
							</p>
						)}
						{!editingMode && (
							<div className="input-container">
								<input
									type="text"
									placeholder="New player"
									value={inputValue}
									onChange={handleInputChange}
									onKeyDown={handleEnterKeyPress}
									ref={(input) => input && input.focus()}
									maxLength={25}
								/>
								<button
									className="add-button"
									onClick={handleAddItem}
								>
									<i class="fas fa-plus"></i> Add
								</button>
							</div>
						)}
						<div className="input-container">
							{list.length > 0 && !editingMode && (
								<button
									onClick={toggleEditingMode}
									className="edit-button"
								>
									<i class="fas fa-edit"></i> Edit list
								</button>
							)}
							{editingMode && (
								<button
									onClick={toggleEditingMode}
									className="done-button"
								>
									<i class="far fa-check-square"></i> Edition done
								</button>
							)}
							{!editingMode && totalPlayers >= 3 && (
								<button
									className="start-button"
									onClick={launchGame}
								>
									<i class="fas fa-rocket"></i> Ready
								</button>
							)}
						</div>
					</div>
				)}
				{mainMenu /* {!showInstructions && !addingPlayers && !launchedGame && !finishedGame && ( */ && (
					<div className="main-menu">
						<h1>The Killer Game</h1>
						<button className="start-button" onClick={startNewGame}>
							Start New Game
						</button>
						<button
							className="instuction-button"
							onClick={loadInstructions}
						>
							Show Instructions
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
