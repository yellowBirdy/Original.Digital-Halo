self.port.on('loadHalo', function (halo)  {
      window.alert('loadingHalo');

      google.load("visualization", "1");
      google.setOnLoadCallback(draw);
      function draw() {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Label');
        data.addColumn('number', 'Value');
        data.addColumn('string', 'Link');
        data.addRows(3);
        data.setValue(0, 0, 'Test');
        data.setValue(0, 1, 10);
        data.setValue(1, 0, 'of');
        data.setValue(1, 1, 30);
        data.setValue(1, 2, 'http://www.google.com');
        data.setValue(2, 0, 'Content Script');
        data.setValue(2, 1, 20);
        var outputDiv = document.getElementById('tcdiv');
        var tc = new TermCloud(outputDiv);
        tc.draw(data, null);
      }
})
