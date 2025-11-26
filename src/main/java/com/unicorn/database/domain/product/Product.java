package com.unicorn.database.domain.product;

import com.unicorn.database.domain.order.OneTimeOrderItem;
import com.unicorn.database.domain.subscription.Subscription;
import jakarta.persistence.*;

import java.awt.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false , length = 10)
    private  String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "current_price" , nullable = false , precision = 10 , scale = 2)
    private Long currentPrice;

//    unit (e.g., litre, kg, packet)
    @Column(nullable = false , length = 10)
    private  String unit ;

    @Column(name = "is_active", nullable = false)
    private  boolean isActive=true;

    @Column(name = "is_active", nullable = false)
    private LocalDate createdAt ;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "product" , fetch = FetchType.LAZY)
    private List<Subscription> subscriptions;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<OneTimeOrderItem> oneTimeOrderItems;

}
