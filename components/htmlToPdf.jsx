import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import RNHTMLtoPDF from 'react-native-html-to-pdf';

const PdfExportScreen = ({
    htmlOne,
    fileName,
    directory,
    ...props 
  }) => {

    const html2 = 
    `<html>
      <head>
        <style>
          body {
            font-family: 'Helvetica';
            font-size: 12px;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
          }
          th {
            background-color: #ccc;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Invoice for Order KUJIRA 3.0</h1>
        </header>
        <h1>Order Details</h1>
        <table>
          <tr>
            <th>Order ID</th>
            <td>4.0</td> 
          </tr>
          <tr>
            <th>Order Date</th>
            <td>29-Jul-2022</td>
          </tr>
          <tr>
            <th>Order Status</th>
            <td>Completed</td>
          </tr>
          <tr>
            <th>Order Total</th>
            <td>$13232</td>
          </tr>
        </table>
        <h1>Order Lines</h1>
        <table>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Qty</th>
            <th>Product Price</th>
          </tr>r
        </table>
        <footer>
          <p>Thank you for your business!</p>
        </footer>
      </body>
    </html>
  `;
    const createPDF = async () => {
        let options = {
            html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
            fileName: 'test',
            base64: true,
          };
      
          try {
            const results = await RNHTMLtoPDF.convert(options)
            console.log(results)
          } catch (err) {
            console.error(err)
          }
        }
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Export to PDF</Text>
          <Button title="Generate PDF" onPress={createPDF} />
        </View>
      );
    };
    


const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    title: {
    fontSize: 24,
    marginBottom: 20,
    },
});

export default PdfExportScreen