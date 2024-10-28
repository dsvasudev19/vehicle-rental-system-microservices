package com.project.vehicles_service.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vehicles_service.entity.Vehicle;
import com.project.vehicles_service.models.VehiclePojo;
import com.project.vehicles_service.repository.VehicleRepository;

@Service
public class VehicleService {
	@Autowired
	private VehicleRepository vehicleRepository;

	public List<VehiclePojo> getAllVehicles() {
		List<Vehicle> vehiclesFound = vehicleRepository.findAll();
		/*
		 * vehicles=new ArrayList<>(); vehiclesFound.stream().forEach((vehicle)->{
		 * VehiclePojo pojo=new VehiclePojo(); BeanUtils.copyProperties(vehicle, pojo);
		 * vehicles.add(pojo); });
		 */
		List<VehiclePojo> vehicles = vehiclesFound.stream().map(vehicle -> {
			VehiclePojo pojo = new VehiclePojo();
			BeanUtils.copyProperties(vehicle, pojo);
			return pojo;
		}).collect(Collectors.toList());
		return vehicles;
	}

	public VehiclePojo getVehicleById(long id) {
		Optional<Vehicle> vehicleFound = vehicleRepository.findById(id);
		if (vehicleFound.isPresent()) {
			VehiclePojo vehicle = new VehiclePojo();
			BeanUtils.copyProperties(vehicleFound.get(), vehicle);
			return vehicle;
		}
		return null;
	}

	public VehiclePojo addNewVehicle(VehiclePojo pojo) {
		Vehicle vehicle = new Vehicle();
		BeanUtils.copyProperties(pojo, vehicle);
		vehicleRepository.save(vehicle);
		return pojo;
	}

	public VehiclePojo updateVehicle(long id, VehiclePojo updatedPojo) {
		Optional<Vehicle> vehicleFound = vehicleRepository.findById(id);
		if (vehicleFound.isPresent()) {
			Vehicle vehicle = vehicleFound.get();
			BeanUtils.copyProperties(updatedPojo, vehicle);
			vehicleRepository.save(vehicle);
			return updatedPojo;

		}
		return null;
	}

	public boolean deleteVehicleById(long id) {
		vehicleRepository.deleteById(id);
		return true;
	}

	public List<VehiclePojo> getAllVehiclesByLocation(String location) {
		List<Vehicle> vehiclesFound = vehicleRepository.findByLocation(location);

		List<VehiclePojo> vehicles = vehiclesFound.stream().map(vehicle -> {
			VehiclePojo pojo = new VehiclePojo();
			BeanUtils.copyProperties(vehicle, pojo);
			return pojo;
		}).collect(Collectors.toList());
		return vehicles;
	}

	public List<VehiclePojo> getAllVehiclesByPincode(String pincode) {
		List<Vehicle> vehiclesFound = vehicleRepository.findByPincode(pincode);
		List<VehiclePojo> vehicles = vehiclesFound.stream().map(vehicle -> {
			VehiclePojo pojo = new VehiclePojo();
			BeanUtils.copyProperties(vehicle, pojo);
			return pojo;
		}).collect(Collectors.toList());
		return vehicles;
	}

	public VehiclePojo getVehicleByRegNum(String regNum) {
		Optional<Vehicle> vehicleFound = vehicleRepository.findByRegNo(regNum);
		if (vehicleFound.isPresent()) {
			VehiclePojo vehicle = new VehiclePojo();
			BeanUtils.copyProperties(vehicleFound.get(), vehicle);
			return vehicle;
		}
		return null;
	}
	
	public List<VehiclePojo> getVehiclesOfVendor(long vendorId){
		List<Vehicle> vehiclesFound = vehicleRepository.findByVendorId(vendorId);
		List<VehiclePojo> vehicles = vehiclesFound.stream().map(vehicle -> {
			VehiclePojo pojo = new VehiclePojo();
			BeanUtils.copyProperties(vehicle, pojo);
			return pojo;
		}).collect(Collectors.toList());
		return vehicles;
	}
	
	public List<VehiclePojo> getAllVehiclesByName(String name){
		List<Vehicle> vehiclesFound = vehicleRepository.findByName(name);
		List<VehiclePojo> vehicles = vehiclesFound.stream().map(vehicle -> {
			VehiclePojo pojo = new VehiclePojo();
			BeanUtils.copyProperties(vehicle, pojo);
			return pojo;
		}).collect(Collectors.toList());
		return vehicles;
	}
	
	public List<VehiclePojo> getAllVehiclesBasedOnSearch(String searchString){
//		List<Vehicle> locationVehicles=vehicleRepository.findByLocation(searchString);
//		List<Vehicle> pincodeVehicles=vehicleRepository.findByPincode(searchString);
//		List<Vehicle> nameVehicles=vehicleRepository.findByName(searchString);
//		List<Vehicle> 
		List<Vehicle> vehiclesFound=vehicleRepository.searchByCriteria(searchString);
		List<VehiclePojo> vehicles = vehiclesFound.stream().map(vehicle -> {
			VehiclePojo pojo = new VehiclePojo();
			BeanUtils.copyProperties(vehicle, pojo);
			return pojo;
		}).collect(Collectors.toList());
		return vehicles;
	}

}
