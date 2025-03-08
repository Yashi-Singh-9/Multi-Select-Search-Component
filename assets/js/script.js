document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const dropdown = document.getElementById("dropdown");
    const selectedOptions = document.getElementById("selectedOptions");
    const toggleDropdown = document.getElementById("toggleDropdown");
    let selectedValues = [];

    // Fetch skills from the JSON file
    async function fetchSkills() {
        const response = await fetch("assets/js/skills.json");
        const skills = await response.json();
        return skills.map(skill => skill.p);
    }

    // Update dropdown with available skills
    async function updateDropdown() {
        const skills = await fetchSkills();
        dropdown.innerHTML = "";

        skills.forEach(skill => {
            if (!selectedValues.includes(skill)) {
                const li = document.createElement("li");
                li.textContent = skill;
                li.addEventListener("click", () => selectSkill(skill));
                dropdown.appendChild(li);
            }
        });

        dropdown.style.display = skills.length ? "block" : "none";
    }

    // Select a skill and add it as a tag inside the input
    function selectSkill(skill) {
        if (selectedValues.length < 5 && !selectedValues.includes(skill)) {
            selectedValues.push(skill);
            updateSelectedSkills();
        }
        dropdown.style.display = "none";
    }

    // Update the input with selected skills as tags
    function updateSelectedSkills() {
        searchInput.value = ""; // Hide text input value
        selectedOptions.innerHTML = ""; // Clear previous tags

        selectedValues.forEach(skill => {
            const skillTag = document.createElement("span");
            skillTag.classList.add("skill-tag");
            skillTag.textContent = skill;
            
            // Hover effect: Red background, white text
            skillTag.addEventListener("mouseover", () => {
                skillTag.style.backgroundColor = "red";
                skillTag.style.color = "white";
            });

            skillTag.addEventListener("mouseout", () => {
                skillTag.style.backgroundColor = "#EDEFFB";
                skillTag.style.color = "#11103C";
            });

            // Click to remove skill
            skillTag.addEventListener("click", () => {
                selectedValues = selectedValues.filter(s => s !== skill);
                updateSelectedSkills();
            });

            selectedOptions.appendChild(skillTag);
        });

        selectedOptions.appendChild(searchInput); // Keep input for new entries
    }

    // Show dropdown when input is focused
    searchInput.addEventListener("focus", async function () {
        await updateDropdown();
        dropdown.style.display = "block";
    });

    // Toggle dropdown on icon click
    toggleDropdown.addEventListener("click", async function () {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            await updateDropdown();
            dropdown.style.display = "block";
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!selectedOptions.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });
});
