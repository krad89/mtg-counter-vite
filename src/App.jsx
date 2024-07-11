import { useState } from "react";
import Button from "@mui/material/Button";
import { Select, MenuItem, Grid, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState([]);

  function handleNewGame() {
    let tempPlayers = [];
    for (let i = 0; i < playerCount; i++) {
      tempPlayers.push({
        id: uuidv4(),
        name: "Name",
        lifepoints: 20,
        poisonCounters: 0,
      });
    }
    setPlayers(tempPlayers);
  }
  function handlePlayer(player) {
    setPlayers((players) =>
      players.map((newPlayer) =>
        player.id === newPlayer.id ? player : newPlayer
      )
    );
  }
  function handleReset() {
    setPlayerCount(2);
    setPlayers([]);
  }

  return (
    <div style={{ margin: "20px" }}>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <PlayerCount
          count={playerCount}
          setCount={setPlayerCount}
          onNewGame={() => handleNewGame()}
        ></PlayerCount>
        <Container
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {players.map((player) => (
            <Player
              key={player.id}
              player={player}
              onAenderung={handlePlayer}
              style={{
                width: "50%", // Set width to 50% to ensure only 2 items per row
                boxSizing: "border-box", // Ensure padding and borders are included in the width
                // Add padding or margin if needed, but adjust width accordingly
              }}
            ></Player>
          ))}
        </Container>
        <MyButton onClick={handleReset}>RESET</MyButton>
      </ThemeProvider>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(160,6,6,1) 50%, rgba(0,200,100,1) 75%, rgba(255,255,255,1) 100%)",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "10px",
          borderRadius: "25px",
        }}
      >
        MTG Lebenspunktezaehler
      </h1>
    </header>
  );
}

function PlayerCount({ count, setCount, onNewGame }) {
  return (
    <div className="new-game-form" style={{ padding: "20px" }}>
      <div>
        <span>
          <label>Anzahl Spieler: </label>
          <Select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <MenuItem value={num} key={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </span>
      </div>
      <MyButton onClick={() => onNewGame()}>Neues Spiel</MyButton>
    </div>
  );
}

function Player({ player, onAenderung, style }) {
  const [playerName, setPlayerName] = useState(player.name);
  function handleLifepoints(value) {
    onAenderung({ ...player, lifepoints: player.lifepoints + value });
  }
  function handlePoisonCounters(value) {
    onAenderung({
      ...player,
      poisonCounters:
        player.poisonCounters + value <= 0 ? 0 : player.poisonCounters + value,
    });
  }
  return (
    <Grid
      container
      spacing={0}
      style={{ ...style, width: "350px" }}
      marginBottom={3}
      marginRight={5}
    >
      <div
        style={{
          background: "rgb(2,0,36)",
          backgroundImage:
            "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9907e740-1f33-4ef8-8c67-a3edc5bf8a40/d5sco15-a8ab6017-79b8-4769-9c67-b51fcfa9eb52.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk5MDdlNzQwLTFmMzMtNGVmOC04YzY3LWEzZWRjNWJmOGE0MFwvZDVzY28xNS1hOGFiNjAxNy03OWI4LTQ3NjktOWM2Ny1iNTFmY2ZhOWViNTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.oJiEZMMvRjlGGe2Enbm_q_Adn_1mSC7xxVvEZXYW38M')",
          backgroundSize: "contain",
          padding: "0px",
          margin: "0px",
          paddingBottom: "10px",
          borderRadius: "25px",
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          style={{
            fontSize: "200%",
            width: "80%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "-15px",
          }}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        ></input>
        <h3 style={{ marginBottom: "-30px" }}>Lebenspunkte:</h3>
        <h1>{player.lifepoints}</h1>

        <h3 style={{ marginBottom: "-30px" }}>Giftmarken:</h3>
        <h1 style={{ marginBottom: "-1px" }}>{player.poisonCounters}</h1>
        <Counter setCounter={handleLifepoints}>Lebenspunkte:</Counter>
        <Counter setCounter={handlePoisonCounters}>Giftmarken:</Counter>
      </div>
    </Grid>
  );
}

function Counter({ children, setCounter }) {
  const [valuePlus, setValuePlus] = useState(0);

  return (
    <div>
      <span style={{ color: "black" }}>{children}</span>
      <Grid container>
        <input
          style={{
            width: "60px",
            fontSize: "20px",
            marginLeft: "40px",
            marginRight: "-20px",
            paddingRight: "1px",
            marginTop: "15px",
            marginBottom: "15px",
            textAlign: "center",
          }}
          type="number"
          value={valuePlus}
          onChange={(e) => setValuePlus(Math.abs(Number(e.target.value)))}
        ></input>
        <div>
          <Grid
            container
            margin={1}
            style={{
              justifyItems: "center",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: "30px",
            }}
          >
            <MyButton
              className="negative-MyButton"
              onClick={() => setCounter(-valuePlus)}
            >
              -X
            </MyButton>
            <MyButton
              className="negative-MyButton"
              onClick={() => setCounter(-5)}
            >
              -5
            </MyButton>
            <MyButton
              className="negative-MyButton"
              onClick={() => setCounter(-1)}
            >
              -1
            </MyButton>
          </Grid>
          <Grid
            container
            margin={1}
            style={{
              justifyItems: "center",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: "30px",
            }}
          >
            {/*<input
            style={{ width: "45px", fontSize: "20px", marginRight: "20px" }}
            type="number"
            value={valuePlus}
            onChange={(e) => setValuePlus(Math.abs(Number(e.target.value)))}
          ></input>*/}
            <MyButton onClick={() => setCounter(valuePlus)}>+X</MyButton>
            <MyButton onClick={() => setCounter(5)}>+5</MyButton>
            <MyButton onClick={() => setCounter(1)}>+1</MyButton>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

function MyButton({ children, onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {children}
    </Button>
  );
}
