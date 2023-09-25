import React, { useState } from "react";

function GameScreen({
	playersData,
	currentPlayerId,
	onNextPlayer,
	findPlayerNameByVictimId,
	finishGame,
}) {
	const [showStartMessage, setShowStartMessage] = useState(false);
	const [showKillMessage, setShowKillMessage] = useState(false);

	// Function to start the game and show the initial message
	const startGame = () => {
		setShowStartMessage(true);

		// Automatically show the kill message after 5 seconds
		setTimeout(() => {
			setShowStartMessage(false);
			setShowKillMessage(true);
		}, 3000);
	};

	const handleConfirmKill = () => {
		if (currentPlayerId < playersData.length - 1) {
			onNextPlayer();
			setShowKillMessage(false);
		} else {
			// Si es el último jugador, finaliza el juego
			setShowKillMessage(false);
			finishGame();
		}
	};

	const currentPlayer = playersData.find(
		(player) => player.order === currentPlayerId
	);
	
	const victim = findPlayerNameByVictimId((currentPlayer.victim_id + 1) % playersData.length);

	return (
		<div className="game-screen">
			{console.log("victim_id is "+ (currentPlayer.victim_id + 1) % playersData.length)}
			{console.log("THE Victim name is "+ findPlayerNameByVictimId((currentPlayer.victim_id + 1) % playersData.length))}
			{!showStartMessage && !showKillMessage && (
				<div>
					<h1>
						Give the device to{" "}
						<span className="player-name">
							{currentPlayer.player_name}
						</span>
					</h1>
					<p>When you are ready, click the button below</p>
					<button className="confirm-player" onClick={startGame}>
						I am{" "}
						<span className="player-name">
							{currentPlayer.player_name}
						</span>
					</button>
				</div>
			)}
			{showStartMessage && currentPlayer && (
				<div>
					<h1>
						Hello,{" "}
						<span className="player-name">
							{currentPlayer.player_name}
						</span>
						!
					</h1>
					<p>Don't tell anybody, but...</p>
				</div>
			)}
			{showKillMessage && currentPlayer && (
				<div className="scret-info">
					<h1>
						{" "}
						Hello,{" "}
						<span className="player-name">
							{currentPlayer.player_name}
						</span>
						!
					</h1>
					<p>
						<span className="player-name">
							{currentPlayer.player_name}
						</span>
						, your first victim is{" "}
						<span className="victim-name">
							{victim}
						</span>
						.
					</p>
					<p>
						Once you kill your target, they must reveal their own
						victim, who will become your next target.
					</p>
					<p>
						Be carefull while hunting{" "}
						<span className="victim-name">
							{victim}
						</span>
						, other people might want to kill you.
					</p>
					<p>
						Good luck,{" "}
						<span className="player-name">
							{currentPlayer.player_name}
						</span>
						, and remember:
					</p>
					<p>
						It's dangerous to go alone!
						<br />
						🔥&nbsp;&nbsp;&nbsp;Take this.&nbsp;&nbsp;&nbsp;🔥
					</p>
					<p>🗡️</p>
					<button
						className="swear-button purple-button"
						onClick={handleConfirmKill}
					>
						Ok! Nice!
					</button>
				</div>
			)}
		</div>
	);
}

export default GameScreen;
