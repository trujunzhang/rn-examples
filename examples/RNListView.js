/* @flow */

import React, {Component} from 'react';
import {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
} from 'react-native';

export default class RNList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._genRows({})),
        });
    }

    _genRows(pressData) {
        var dataBlob = [];
        for (var ii = 0; ii < 100; ii++) {
            var pressedText = pressData[ii] ? ' (pressed)' : '';
            dataBlob.push('Row ' + ii + pressedText);
        }
        return dataBlob;
    }

    render() {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            renderSeparator={this._renderSeparator}
          />
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
        var rowHash = 123;
        var imgSource = require('../images/Bananavarieties.jpg');
        return (
          <TouchableHighlight onPress={() => {
              this._pressRow(rowID);
              highlightRow(sectionID, rowID);
          }}>
              <View>
                  <View style={styles.row}>
                      <Image style={styles.thumb} source={imgSource}/>
                      <Text style={styles.text}>
                          {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
                      </Text>
                  </View>
              </View>
          </TouchableHighlight>
        );
    }

    _pressRow(rowID) {
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
              this._genRows(this._pressData)
            )
        });
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
          <View
            key={`${sectionID}-${rowID}`}
            style={{
                height: adjacentRowHighlighted ? 4 : 1,
                backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
            }}
          />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});