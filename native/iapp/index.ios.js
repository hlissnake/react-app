/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  TextInput
} = React;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var WEBVIEW_URL = 'http://groups.demo.taobao.net/tmapp/flash/demo/index.php';

var iapp = React.createClass({
  getInitialState : function(){
    return {
      scale : false
    }
  },

  handleTextInputChange : function(){
    this.setState({
      scale : true
    });
  },

  componentDidMount : function(){
    var me = this;
    setTimeout(function(){
      me.setState({
        scale : true
      });
    }, 1000)
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, please edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={WEBVIEW_URL}
          javaScriptEnabledAndroid={true}
          startInLoadingState={true}
          scalesPageToFit={this.state.scale}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14
  },
  webView: {
    backgroundColor: BGWASH,
    width: 320,
    height: 250,
  }
});

AppRegistry.registerComponent('iapp', () => iapp);
