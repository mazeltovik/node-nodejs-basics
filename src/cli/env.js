const parseEnv = () => {
    let res = '';
    for(let key in process.env){
        if(key.match('RSS_')){
            res += `${key}=${process.env[key]}; `
        }
    }
    console.log(res.slice(0,-2));
};

parseEnv();