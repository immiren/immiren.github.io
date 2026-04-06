// Characters
const vanguards = [
    "Angela", "Captain America", "Deadpool", "Doctor Strange", "Emma Frost", "Groot", "Hulk", "Magneto", "Peni Parker", "Rogue", "The Thing", "Thor", "Venom"
]
const duelists = ["Black Panther", "Black Widow", "Blade", "Daredevil", "Deadpool", "Elsa Bloodstone", "Hawkeye", "Hela", "Human Torch", "Iron Fist", "Iron Man", "Magik", "Mister Fantastic", "Moon Knight", "Namor", "Phoenix", "Psylocke", "Scarlet Witch", "Spider-Man", "Squirrel Girl", "Star-Lord", "Storm", "The Punisher", "Winter Soldier", "Wolverine"]
const strategists = [
    "Adam Warlock", "Cloak & Dagger", "Deadpool", "Gambit", "Invisible Woman", "Jeff the Land Shark", "Loki", "Luna Snow", "Mantis", "Rocket Raccoon", "Ultron", "White Fox"
]
const allCharacters = [...vanguards, ...duelists, ...strategists];

// Main function
function generateTeamComp() {
    const teamSizeElement = document.querySelector("#team-size");
    const minStrategistsElement = document.querySelector("#min-strategists");
    const evenRolesElement = document.querySelector("#even-roles");
    const outputElement = document.querySelector("#output");

    const teamSize = Number.parseInt(teamSizeElement.value);
    const minStrategists = Number.parseInt(minStrategistsElement.value);
    const evenRoles = evenRolesElement.value;

    let roles = [];
    let uniqueHeroes = new Set();

    const vanguardMaxId = vanguards.length - 1;
    const duelistMaxId = vanguardMaxId + duelists.length;

    let output = "";

    while (uniqueHeroes.size < teamSize) {
        let randomHero;
        let roleID;
        let role;
        // Min strategists
        if (uniqueHeroes.size < minStrategists) {
            role = "Strategist";
            randomHero = getRandomCharacter(strategists);
        } else {
            // Strategists assigned
            if (evenRoles == true) {
                // Even roles
                roleID = getRandomInt(2);

                // 0: vanguard, 1: duelist, 2: strategist
                if (roleID == 0) {
                    role = "Vanguard";
                    randomHero = getRandomCharacter(vanguards);
                } else if (roleID == 1) {
                    role = "Duelist";
                    randomHero = getRandomCharacter(duelists);
                } else {
                    role = "Strategist";
                    randomHero = getRandomCharacter(strategists);
                }
            } else {
                // Even characters
                roleID = getRandomInt(allCharacters.length - 1);
                if (roleID <= vanguardMaxId) {
                    role = "Vanguard";
                } else if (roleID <= duelistMaxId) {
                    role = "Duelist";
                } else {
                    role = "Strategist";
                }
                randomHero = allCharacters[roleID];
            }
        }
        if (!uniqueHeroes.has(randomHero)) {
            roles.push(role + ": " + randomHero);
            uniqueHeroes.add(randomHero);
        }
    }

    for (let i = roles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = roles[i];
        roles[i] = roles[j];
        roles[j] = k;
    }
    roles.forEach((hero, index) => {
        output += ((index + 1) + " " + hero + "\n");
    })
    outputElement.textContent = output;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomCharacter(characters) {
    const id = getRandomInt(characters.length);
    return characters[id];
}
