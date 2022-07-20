import Api from "./index";

const request = new Api();

describe("Testing API", () =>{
    it("Makes login calls", () =>{
        request.login({})
            .then((response) => {
                console.log("Response")
            })
            .catch((error) => {
                console.log("sdsds");
            })
    });
})

