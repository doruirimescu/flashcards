export var IS_HOSTED_LOCALLY = false;
export const GITHUB_USERNAME = "doruirimescu";
export const GITHUB_BRANCH = "master";
export const GITHUB_FETCH_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/language-flashcards/${GITHUB_BRANCH}/public/data/`;

export async function getStructure() {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `/public/data/structure.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}structure.json`;
    }
    const response = await fetch(fetch_url);
    const data = await response.json();
    console.log(data);
    return data;
}
