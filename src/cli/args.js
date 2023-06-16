const parseArgs = () => {
    let res = '';
    let args = process.argv.slice(2);
    for(let i = 0;i<args.length;i++){
        if(i%2 != 0) continue;
        else res += `${args[i]} is ${args[i+1]}, `;
    }
    console.log(res.slice(0,-2));
};

parseArgs();