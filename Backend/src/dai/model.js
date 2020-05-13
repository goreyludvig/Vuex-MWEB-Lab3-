import mongoose from 'mongoose';

const daiSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    mark: {
        type:String,
        required: true
    },
    number: {
        type:String,
        required: true
    },
    year: {
        type:Number,
        required: true,
        min:1885, // поява перших машин з бензиновими та газовими двигунами
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }

});

const Dai = mongoose.model("Dai", daiSchema);

export default Dai;