import Dai from "./model";

export default {
    async run(req, res) {
        try {
            await Dai.deleteMany({});
            const drivers = [
                {
                    name: "Ludig Gorey",
                    mark: "Mercedes",
                    number: "AO 7777 AI",
                    year: 2015
                },
                {
                    name: "Ivan Polovko",
                    mark: "Volkswagen",
                    number: "AO 5634 AI",
                    year: 2011
                },
                {
                    name: "Vadym Gerich",
                    mark: "Skoda",
                    number: "AO 1156 AI",
                    year: 2004
                },
                {
                    name: "Erik Kis",
                    mark: "BMW",
                    number: "AO 1167 AI",
                    year: 2006
                },
                {
                    name: "Ivan Patskan",
                    mark: "Lada",
                    number: "AO 9999 AI",
                    year: 2004
                },
                {
                    name: "Mendjul Serhii",
                    mark: "Mercedes",
                    number: "AO 1111 AI",
                    year: 2001
                }
            ];

            drivers.forEach(async dai => await new Dai(dai).save());
        } catch (error) {
            console.log(error)
        }
    }
}
