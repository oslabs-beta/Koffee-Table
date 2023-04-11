const {Kafka} = require('kafkajs');

// const msg = process.argv[2];

const producerController2 = {};

producerController2.addMsg = (req, res, next) => {
    // console.log("here")
    const input = JSON.stringify(req.body.input)
    run(input)
    return next();
};

// run("input")

async function run(input){
    try{
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:8098"],
        })

        const producer = kafka.producer();
        await producer.connect();
        console.log('connected');
        let partition;
        if(input.toLowerCase() === input){
            partition = 0;
        }
        else{
            partition = 1;
        }
        const result = await producer.send({
            "topic": "Users",
            "messages": [{
                "value": input,
                "partition": partition
            }]
        })
        // await admin.createTopics({
        //     "topics": [{
        //         "topic": "Users",
        //         "numPartitions": 2
        //     }]
        // })
        console.log('created sucessfully', JSON.stringify(result))
        console.log('Here is producer.events: ', producer.events);
        await producer.disconnect();

    }
    catch(err){
        console.log('error', err);
    }
    finally{
        // setTimeout( () => run("later massage"), 2000)
        // process.exit(0);
    }
}

module.exports = producerController2;

