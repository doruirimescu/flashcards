export var IS_HOSTED_LOCALLY = true;
export const GITHUB_USERNAME = "doruirimescu";
export const GITHUB_BRANCH = "master";
export const GITHUB_FETCH_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/language-flashcards/${GITHUB_BRANCH}/public/data/`;

export async function getStructure(LOCAL_FETCH_URL) {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `${LOCAL_FETCH_URL}structure.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}structure.json`;
    }
    const response = await fetch(fetch_url);
    const data = await response.json();
    console.log(data);
    return data;
}

export async function getCount(LOCAL_FETCH_URL) {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `${LOCAL_FETCH_URL}count.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}count.json`;
    }
    const response = await fetch(fetch_url);
    const data = await response.json();
    console.log(data);
    return data;
}
