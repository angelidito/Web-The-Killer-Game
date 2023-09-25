import React from "react";

function Rules({goBackMainMenu}) {
	return (
		<div className="instructions">
			<button className="float-go-back-button" onClick={goBackMainMenu}>
				Go Back to Main Menu
			</button>

			<h1>The Killer Game: Rules</h1>

			<h2>Objective:</h2>
			<p>
				The objective of the game is to be the last person standing by
				successfully "killing" your assigned target(s) while avoiding
				being "killed" yourself.
			</p>

			<h2>Number of Players:</h2>
			<p>
				The game can be played with a group of players. The more
				players, the more challenging and dynamic the game becomes.
			</p>

			<h2>Setup:</h2>
			<ul>
				<li>
					Each player is assigned a target. This assignment should be
					done discreetly to maintain the secrecy of everyone's
					targets.
				</li>
			</ul>

			<h2>Gameplay:</h2>
			<ul>
				<li>
					To "kill" your target, you must be alone with them, with no
					one else within a distance of 3-5 meters, as agreed upon by
					the group.
				</li>
				<li>
					When you are alone with your target, you must say, "You are
					dead" to them. Once you've done this, your target is
					considered "killed."
				</li>
				<li>
					The "killed" player must reveal their target to their
					killer. This information allows the killer to have a new
					target.
				</li>
				<li>
					Players are allowed to lie about their objectives or their
					alive/dead status. However, during group checks, all players
					must truthfully reveal their status.
				</li>
				<li>
					Players should exercise caution and not be alone with only
					one person, as that person might be their killer. Trust no
					one, even those you've already killed.
				</li>
				<li>
					Players who have been "killed" are not out of the game. They
					can assist their killers or other players in achieving their
					objectives by leading their targets into situations where
					they can be "killed."
				</li>
			</ul>

			<h2>Ending the Game:</h2>
			<p>The game can end in one of two ways:</p>
			<ul>
				<li>
					FIRST: the group decides to end the game collectively, typically after a predetermined time frame or when they feel they've had enough fun.
				</li>
				<li>
					SECOND: only two players remain, and one of them successfully"kills" the other. The surviving player is declared the winner.
				</li>
			</ul>

			<h2>Values Promoted:</h2>
			<p>
				"The Killer" is designed to promote several values, including
				collaboration, cooperation, creativity, patience, initiative,
				risk-handling, and strategy. Players must work together, adapt
				to changing situations, and strategize to outwit their
				opponents.
			</p>

			<h2>Additional Tips:</h2>
			<ul>
				<li>
					Encourage players to interact with each other beyond just
					"killing" their targets. Engage in conversations and
					socialize with others to create a more dynamic and fun
					experience.
				</li>
				<li>
					It's a good idea to have periodic group checks to maintain
					the game's integrity and ensure that players are honest
					about their status.
				</li>
				<li>
					Be respectful of other players' personal boundaries and
					comfort levels regarding the "alone" rule. Adjust the
					distance as needed to accommodate different play
					environments and player preferences.
				</li>
			</ul>

			<p>
				Enjoy playing "The Killer," and have fun socializing and
				strategizing with your friends!
			</p>
		</div>
	);
}

export default Rules;
