import React, { useState, useEffect } from "react";
import provinceApi from "../../apis/provinceApi";
import { isArray } from "../../utils/fun";

const FETCH_TYPES = {
  PROVINCES: "provinces",
  DISTRICTS: "districts",
  WARDS: "wards",
};

async function fetchLocationOptions(fetchType, pathVariable) {
  switch (fetchType) {
    case FETCH_TYPES.PROVINCES: {
      return await provinceApi.getProvinces();
    }
    case FETCH_TYPES.DISTRICTS: {
      return await provinceApi.getDistricts(pathVariable);
    }
    case FETCH_TYPES.WARDS: {
      return await provinceApi.getWards(pathVariable);
    }
    default: {
      return [];
    }
  }
}

async function getLocationOptions(fetchType, pathVariable) {
  const options = await fetchLocationOptions(fetchType, pathVariable);
  return [...options.data];
}

async function fetchInitialData(provinceId, districtId, wardId) {
  let [provinces, districts, wards] = await Promise.all([
    getLocationOptions(FETCH_TYPES.PROVINCES),
    getLocationOptions(FETCH_TYPES.DISTRICTS, provinceId),
    getLocationOptions(FETCH_TYPES.WARDS, districtId),
  ]);
  provinces = provinces.map((item) => ({
    title: item.ProvinceName,
    code: item.ProvinceID,
    active: provinceId == item.ProvinceID,
  }));
  districts = districts.map((item) => ({
    title: item.DistrictName,
    code: item.DistrictID,
    active: districtId == item.DistrictID,
  }));
  wards = wards.map((item) => ({
    title: item.WardName,
    code: item.WardCode,
    active: wardId == item.WardCode,
  }));
  return {
    provinceOptions: provinces,
    districtOptions: districts,
    wardOptions: wards,
    selectedProvince: provinces.find((i) => i.active),
    selectedDistrict: districts.find((i) => i.active),
    selectedWard: wards.find((i) => i.active),
  };
}

function useLocations({ provinceId = null, districtId = null, wardId = null }) {
  console.log({ provinceId, districtId, wardId });
  const [state, setState] = useState({
    provinceOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedProvince: null,
    selectedDistrict: null,
    selectedWard: null,
  });

  const { selectedProvince, selectedDistrict } = state;

  useEffect(() => {
    (async () => {
      const options = await getLocationOptions(FETCH_TYPES.PROVINCES);
      setState({
        ...state,
        provinceOptions: options.map((item) => ({
          title: item.ProvinceName,
          code: item.ProvinceID,
        })),
      });
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (provinceId && districtId && wardId) {
        const initialData = await fetchInitialData(
          provinceId,
          districtId,
          wardId
        );
        setState(initialData);
      }
    })();
  }, [provinceId, districtId, wardId]);
  useEffect(() => {
    (async () => {
      if (!selectedProvince) return;
      if (!isArray(state.districtOptions)) {
        const options = await getLocationOptions(
          FETCH_TYPES.DISTRICTS,
          selectedProvince.code
        );
        setState({
          ...state,
          districtOptions: options.map((item) => ({
            title: item.DistrictName,
            code: item.DistrictID,
          })),
        });
      }
    })();
  }, [selectedProvince]);

  useEffect(() => {
    (async () => {
      if (!selectedDistrict) return;
      if (!isArray(state.wardOptions)) {
        const options = await getLocationOptions(
          FETCH_TYPES.WARDS,
          selectedDistrict.code
        );
        setState({
          ...state,
          wardOptions: options.map((item) => ({
            title: item.WardName,
            code: item.WardCode,
          })),
        });
      }
    })();
  }, [selectedDistrict]);

  function onProvinceSelect(option) {
    setState({
      ...state,
      districtOptions: [],
      wardOptions: [],
      selectedProvince: option,
      selectedDistrict: null,
      selectedWard: null,
    });
  }

  function onDistrictSelect(option) {
    setState({
      ...state,
      wardOptions: [],
      selectedDistrict: option,
      selectedWard: null,
    });
  }

  function onWardSelect(option) {
    setState({ ...state, selectedWard: option });
  }

  function onSubmit(e) {
    e.preventDefault();
    window.location.reload();
  }

  return { state, onProvinceSelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocations;
