if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:
'mongodb://abobakr:abobakr@ds259768.mlab.com:59768/moviecatalogue'};
}
else{
  module.exports = {mongoURI: 'mongodb://localhost/moviecatalogue'};
}
