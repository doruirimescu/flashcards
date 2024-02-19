export var IS_HOSTED_LOCALLY = true;
export const GITHUB_USERNAME = "doruirimescu";
export const GITHUB_BRANCH = "master";
export const GITHUB_FETCH_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/language-flashcards/${GITHUB_BRANCH}/public/data/`;

export async function getLanguageData(prefix = "") {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `${prefix}/data/structure.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}structure.json`;
    }
    const response = await fetch(fetch_url);
    const data = await response.json();
    return data;
}
