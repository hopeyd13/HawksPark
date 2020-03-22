//
//  TransmitViewController.swift
//  HawksPark
//
//  Created by Mahmoud shabana on 2/9/20.
//  Copyright © 2020 Monmouth University. All rights reserved.
//

import UIKit
import CoreLocation
import CoreBluetooth

class TransmitViewController: UIViewController, CBPeripheralManagerDelegate{
    
    @IBOutlet weak var uuidLabel: UILabel!
    @IBOutlet weak var majorLabel: UILabel!
    @IBOutlet weak var minorLabel: UILabel!
    @IBOutlet weak var identityLabel: UILabel!
    
    var beaconRegion : CLBeaconRegion!
    var beaconPeripheralData : NSDictionary!
    var peripheralManager : CBPeripheralManager!

    override func viewDidLoad() {
        super.viewDidLoad()
        initBeaconRegion()
        setLabels()
        // Do any additional setup after loading the view.
    }
    
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        if (peripheral.state == .poweredOn) {
            peripheralManager.startAdvertising(beaconPeripheralData as? [String : Any])
            print("Powered On")
        } else {
            peripheralManager.stopAdvertising()
            print("Not Powered On, or possible error")
        }
    }
    
    @IBAction func transmitButtonTapped(_ sender: UIButton) {
        beaconPeripheralData = beaconRegion .peripheralData(withMeasuredPower: nil) //using default value for withMeasuredPower, using specific RSSI from 1 meter instead of default
        peripheralManager = CBPeripheralManager.init(delegate: self, queue: nil)
    }
    
    func initBeaconRegion() {
        beaconRegion = CLBeaconRegion.init(proximityUUID: UUID.init(uuidString: "2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6")!, major: 1233, minor: 45, identifier: "com.testBeacon")
    }
    
    func setLabels() {
        uuidLabel.text = beaconRegion.proximityUUID.uuidString
        majorLabel.text = beaconRegion.major?.stringValue
        minorLabel.text = beaconRegion.minor?.stringValue
        identityLabel.text = beaconRegion.identifier
    }
    
}
