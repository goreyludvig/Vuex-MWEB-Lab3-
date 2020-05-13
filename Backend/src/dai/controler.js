import Dai from "./model";

const daiControler = {
    async get(req, res) {
        try {
           
            const list = await Dai.find(makeQueryObject (req.query));            
            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }

        function makeQueryObject(query){
            let result={};
            if(query.nme)
            result.$expr={"$eq":[{"$nme":"$name"},]};

            return result;
        }
    },
    async getById(req, res) {
        try {
            const dai = await Dai.findById(req.params.id);
            if (!dai)
                res.status(404).send("Not found");
            res.send(dai);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    async post (req, res) {
        try {           
            const dai = new Dai(req.body);
            await dai.save();
            res.send(dai);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const dai = await Dai.findByIdAndDelete(req.params.id);
            if (!dai)
                res.status(404).send("Not found");
            res.send(dai);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async patch(req, res) {
        try {
            const dai = await Dai.findByIdAndUpdate(req.params.id, req.body, {new: true}) ;
            if (!dai)
                res.status(404).send("Not found");
            await dai.save();  
            res.send(dai);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default daiControler;