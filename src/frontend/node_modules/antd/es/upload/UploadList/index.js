import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import FileTwoTone from "@ant-design/icons/es/icons/FileTwoTone";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import PaperClipOutlined from "@ant-design/icons/es/icons/PaperClipOutlined";
import PictureTwoTone from "@ant-design/icons/es/icons/PictureTwoTone";
import classNames from 'classnames';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import * as React from 'react';
import Button from '../../button';
import { ConfigContext } from '../../config-provider';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import collapseMotion from '../../_util/motion';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import { isImageUrl, previewImage } from '../utils';
import ListItem from './ListItem';
var listItemMotion = _extends({}, collapseMotion);
delete listItemMotion.onAppearEnd;
delete listItemMotion.onEnterEnd;
delete listItemMotion.onLeaveEnd;
var InternalUploadList = function InternalUploadList(props, ref) {
  var _props$listType = props.listType,
    listType = _props$listType === void 0 ? 'text' : _props$listType,
    _props$previewFile = props.previewFile,
    previewFile = _props$previewFile === void 0 ? previewImage : _props$previewFile,
    onPreview = props.onPreview,
    onDownload = props.onDownload,
    onRemove = props.onRemove,
    locale = props.locale,
    iconRender = props.iconRender,
    _props$isImageUrl = props.isImageUrl,
    isImgUrl = _props$isImageUrl === void 0 ? isImageUrl : _props$isImageUrl,
    customizePrefixCls = props.prefixCls,
    _props$items = props.items,
    items = _props$items === void 0 ? [] : _props$items,
    _props$showPreviewIco = props.showPreviewIcon,
    showPreviewIcon = _props$showPreviewIco === void 0 ? true : _props$showPreviewIco,
    _props$showRemoveIcon = props.showRemoveIcon,
    showRemoveIcon = _props$showRemoveIcon === void 0 ? true : _props$showRemoveIcon,
    _props$showDownloadIc = props.showDownloadIcon,
    showDownloadIcon = _props$showDownloadIc === void 0 ? false : _props$showDownloadIc,
    removeIcon = props.removeIcon,
    previewIcon = props.previewIcon,
    downloadIcon = props.downloadIcon,
    _props$progress = props.progress,
    progress = _props$progress === void 0 ? {
      strokeWidth: 2,
      showInfo: false
    } : _props$progress,
    appendAction = props.appendAction,
    _props$appendActionVi = props.appendActionVisible,
    appendActionVisible = _props$appendActionVi === void 0 ? true : _props$appendActionVi,
    itemRender = props.itemRender,
    disabled = props.disabled;
  var forceUpdate = useForceUpdate();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    motionAppear = _React$useState2[0],
    setMotionAppear = _React$useState2[1];
  // ============================= Effect =============================
  React.useEffect(function () {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach(function (file) {
      if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== undefined) {
        return;
      }
      file.thumbUrl = '';
      if (previewFile) {
        previewFile(file.originFileObj).then(function (previewDataUrl) {
          // Need append '' to avoid dead loop
          file.thumbUrl = previewDataUrl || '';
          forceUpdate();
        });
      }
    });
  }, [listType, items, previewFile]);
  React.useEffect(function () {
    setMotionAppear(true);
  }, []);
  // ============================= Events =============================
  var onInternalPreview = function onInternalPreview(file, e) {
    if (!onPreview) {
      return;
    }
    e === null || e === void 0 ? void 0 : e.preventDefault();
    return onPreview(file);
  };
  var onInternalDownload = function onInternalDownload(file) {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };
  var onInternalClose = function onInternalClose(file) {
    onRemove === null || onRemove === void 0 ? void 0 : onRemove(file);
  };
  var internalIconRender = function internalIconRender(file) {
    if (iconRender) {
      return iconRender(file, listType);
    }
    var isLoading = file.status === 'uploading';
    var fileIcon = isImgUrl && isImgUrl(file) ? /*#__PURE__*/React.createElement(PictureTwoTone, null) : /*#__PURE__*/React.createElement(FileTwoTone, null);
    var icon = isLoading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PaperClipOutlined, null);
    if (listType === 'picture') {
      icon = isLoading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : fileIcon;
    } else if (listType === 'picture-card') {
      icon = isLoading ? locale.uploading : fileIcon;
    }
    return icon;
  };
  var actionIconRender = function actionIconRender(customIcon, callback, prefixCls, title) {
    var btnProps = {
      type: 'text',
      size: 'small',
      title: title,
      disabled: disabled,
      onClick: function onClick(e) {
        callback();
        if (isValidElement(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e);
        }
      },
      className: "".concat(prefixCls, "-list-item-card-actions-btn")
    };
    if (isValidElement(customIcon)) {
      var btnIcon = cloneElement(customIcon, _extends(_extends({}, customIcon.props), {
        onClick: function onClick() {}
      }));
      return /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
        icon: btnIcon
      }));
    }
    return /*#__PURE__*/React.createElement(Button, _extends({}, btnProps), /*#__PURE__*/React.createElement("span", null, customIcon));
  };
  // ============================== Ref ===============================
  // Test needs
  React.useImperativeHandle(ref, function () {
    return {
      handlePreview: onInternalPreview,
      handleDownload: onInternalDownload
    };
  });
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  // ============================= Render =============================
  var prefixCls = getPrefixCls('upload', customizePrefixCls);
  var listClassNames = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-list"), true), "".concat(prefixCls, "-list-").concat(listType), true), "".concat(prefixCls, "-list-rtl"), direction === 'rtl'));
  // >>> Motion config
  var motionKeyList = _toConsumableArray(items.map(function (file) {
    return {
      key: file.uid,
      file: file
    };
  }));
  var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
  // const transitionName = list.length === 0 ? '' : `${prefixCls}-${animationDirection}`;
  var motionConfig = {
    motionDeadline: 2000,
    motionName: "".concat(prefixCls, "-").concat(animationDirection),
    keys: motionKeyList,
    motionAppear: motionAppear
  };
  if (listType !== 'picture-card') {
    motionConfig = _extends(_extends({}, listItemMotion), motionConfig);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: listClassNames
  }, /*#__PURE__*/React.createElement(CSSMotionList, _extends({}, motionConfig, {
    component: false
  }), function (_ref) {
    var key = _ref.key,
      file = _ref.file,
      motionClassName = _ref.className,
      motionStyle = _ref.style;
    return /*#__PURE__*/React.createElement(ListItem, {
      key: key,
      locale: locale,
      prefixCls: prefixCls,
      className: motionClassName,
      style: motionStyle,
      file: file,
      items: items,
      progress: progress,
      listType: listType,
      isImgUrl: isImgUrl,
      showPreviewIcon: showPreviewIcon,
      showRemoveIcon: showRemoveIcon,
      showDownloadIcon: showDownloadIcon,
      removeIcon: removeIcon,
      previewIcon: previewIcon,
      downloadIcon: downloadIcon,
      iconRender: internalIconRender,
      actionIconRender: actionIconRender,
      itemRender: itemRender,
      onPreview: onInternalPreview,
      onDownload: onInternalDownload,
      onClose: onInternalClose
    });
  }), appendAction && ( /*#__PURE__*/React.createElement(CSSMotion, _extends({}, motionConfig, {
    visible: appendActionVisible,
    forceRender: true
  }), function (_ref2) {
    var motionClassName = _ref2.className,
      motionStyle = _ref2.style;
    return cloneElement(appendAction, function (oriProps) {
      return {
        className: classNames(oriProps.className, motionClassName),
        style: _extends(_extends(_extends({}, motionStyle), {
          // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
          pointerEvents: motionClassName ? 'none' : undefined
        }), oriProps.style)
      };
    });
  })));
};
var UploadList = /*#__PURE__*/React.forwardRef(InternalUploadList);
if (process.env.NODE_ENV !== 'production') {
  UploadList.displayName = 'UploadList';
}
export default UploadList;