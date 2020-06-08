var redis= require('redis').createClient()


function autorizar(authorization) {
  return new Promise(resolve => {
    redis.hmget(`authorization#${authorization}`, "authorization", (err, result) => {
      if (result) {
        resolve(
          {
            status: 200,
            response: result
          }
        );
      } else {
        console.log(err);
        resolve({
          status: 400,
          response: err
        }
        );
      }
    });
  });
}

function saveTable (idBoard, table) {
  return new Promise (resolve => {
    redis.hmset(`board#${idBoard}`, "tateti", table, (err, result) => {
      if (result) {
          resolve(
            { status: 200,
              response: JSON.parse(table),
          })

      }
      else {
          resolve(
            {
              status: 400,
              response: err
          })
      }
  })
})

}

function getTable (idBoard) {
  return new Promise (resolve => {
    redis.hmget(`board#${idBoard}`, "tateti", (err, result) => {
      if (result) {
          resolve(
            { status: 200,
              response: JSON.parse(result),
          })

      }
      else {
          resolve(
            {
              status: 400,
              response: err
          })
      }
  })
})

}

module.exports = { autorizar, saveTable, getTable };